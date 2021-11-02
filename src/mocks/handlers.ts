import { MockedRequest, rest } from 'msw';

interface RequestWithFormData extends MockedRequest {
  body: {
    username: string;
    password: string;
    confirmPassword?: string;
    phoneNumber?: string;
  };
}

const mockUser = {
  id: '1',
  username: 'alice',
  password: 'pass',
  phoneNumber: '123',
};

const jwtTokenMock = '1234567890abcdefghijklmnopqrstuvwxyz';
const storageItem = 'is-authenticated';

const setAuthItem = doAfter => {
  sessionStorage.setItem(storageItem, 'true');
  return doAfter();
};

export const handlers = [
  // Handles a POST /user request
  rest.post(
    '/user',
    (
      { body: { username, password, confirmPassword } }: RequestWithFormData,
      res,
      ctx,
    ) =>
      // Is the data valid and is it our mock user?
      username === mockUser.username ||
      password === mockUser.password ||
      password === confirmPassword
        ? res(ctx.status(200), ctx.json([{ token: jwtTokenMock }]))
        : res(ctx.status(400), ctx.json([{ error: 'Invalid data' }])),
  ),
  // Handles a POST /user/:userId request
  rest.post(
    '/user/:userId',
    ({ body: { username, password } }: RequestWithFormData, res, ctx) =>
      // are you the mock user?
      username === mockUser.username && password === mockUser.password
        ? // let's store the auth state in sessionStorage
          setAuthItem(() =>
            res(ctx.status(200), ctx.json([{ token: jwtTokenMock }])),
          )
        : res(ctx.status(403), ctx.json([{ error: 'Invalid credentials' }])),
  ),
  // Handles a GET /user request
  rest.get('/user/:userId', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem(storageItem);
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'dude',
      }),
    );
  }),
];
