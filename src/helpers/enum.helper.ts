export abstract class EnumHelper {
  static toSet<T>(input: T): Set<T> {
    return new Set(Object.values(input));
  }
}
