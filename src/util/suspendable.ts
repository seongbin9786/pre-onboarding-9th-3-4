enum SuspenderStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const suspendable = <T>(promise: Promise<T>) => {
  let status = SuspenderStatus.PENDING;
  let result: T;

  const suspender = promise
    .then((data) => {
      status = SuspenderStatus.SUCCESS;
      result = data;
    })
    .catch((error) => {
      status = SuspenderStatus.ERROR;
      result = error;
    });

  return function (): T {
    if (status === SuspenderStatus.PENDING) {
      throw suspender;
    }
    if (status === SuspenderStatus.ERROR) {
      throw result;
    }
    if (!result) {
      throw new Error();
    }
    return result;
  };
};
