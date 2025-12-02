"use server";

type ActionHandler<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

interface ServerActionOptions<TInput> {
  validate?: (input: TInput) => void | Promise<void>;
  onError?: (error: unknown) => never;
}

/**
 * Creates a secure, structured server action.
 */
export function createServerAction<TInput, TOutput>(
  handler: ActionHandler<TInput, TOutput>,
  options?: ServerActionOptions<TInput>
) {
  return async (input: TInput): Promise<TOutput> => {
    try {
      if (options?.validate) {
        await options.validate(input);
      }

      const result = await handler(input);
      return result;
    } catch (error) {
      if (options?.onError) {
        return options.onError(error);
      }
      throw error;
    }
  };
}
