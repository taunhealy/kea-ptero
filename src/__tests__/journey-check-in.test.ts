import { prismaMock } from '../singleton';
import handler from '@/app/api/journeys/check-in';
import { createMocks } from 'node-mocks-http';
import { MockDate } from 'mockdate';

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(() => Promise.resolve({ user: { id: '1' } })),
}));

describe('Journey Check-in API', () => {
  beforeEach(() => {
    MockDate.set('2023-05-01T12:00:00Z');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('allows check-in on a new day', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { journeyId: '1' },
    });

    prismaMock.journey.findUnique.mockResolvedValue({
      id: 1,
      streak: 5,
      lastCheckedIn: new Date('2023-04-30T12:00:00Z'),
    } as any);

    prismaMock.journey.update.mockResolvedValue({
      id: 1,
      streak: 6,
      lastCheckedIn: new Date('2023-05-01T12:00:00Z'),
    } as any);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        streak: 6,
        lastCheckedIn: '2023-05-01T12:00:00.000Z',
      })
    );
  });

  it('prevents check-in on the same day', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { journeyId: '1' },
    });

    prismaMock.journey.findUnique.mockResolvedValue({
      id: 1,
      streak: 5,
      lastCheckedIn: new Date('2023-05-01T10:00:00Z'),
    } as any);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Already checked in today',
    });
  });
});
