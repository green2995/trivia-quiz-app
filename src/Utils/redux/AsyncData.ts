function getInitialState<T>() {
  return {
    loading: false,
    error: false,
    data: undefined as T | undefined
  }
}

function markLoad<T>(target: AsyncData<T>) {
  target.loading = true;
  target.error = false;
}

function markError<T>(target: AsyncData<T>) {
  target.loading = false;
  target.error = true;
}

function markSuccess<T>(target: AsyncData<T>, data: T) {
  target.loading = false;
  target.data = data;
}

type AsyncData<T> = {
  loading: boolean
  error: boolean
  data: T
}

const AsyncData = {
  getInitialState,
  markLoad,
  markError,
  markSuccess,
}

export default AsyncData