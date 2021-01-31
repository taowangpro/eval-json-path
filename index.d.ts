declare module 'eval-json-path' {
  export default function 
    evalJsonPath<T = unknown>(state: unknown, path: string, defaultValue: T): T;
}
