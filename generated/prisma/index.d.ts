
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Asfi_Requests
 * 
 */
export type Asfi_Requests = $Result.DefaultSelection<Prisma.$Asfi_RequestsPayload>
/**
 * Model Asfi_Files
 * 
 */
export type Asfi_Files = $Result.DefaultSelection<Prisma.$Asfi_FilesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ProccesType: {
  R: 'R',
  S: 'S'
};

export type ProccesType = (typeof ProccesType)[keyof typeof ProccesType]

}

export type ProccesType = $Enums.ProccesType

export const ProccesType: typeof $Enums.ProccesType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Asfi_Requests
 * const asfi_Requests = await prisma.asfi_Requests.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Asfi_Requests
   * const asfi_Requests = await prisma.asfi_Requests.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.asfi_Requests`: Exposes CRUD operations for the **Asfi_Requests** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Asfi_Requests
    * const asfi_Requests = await prisma.asfi_Requests.findMany()
    * ```
    */
  get asfi_Requests(): Prisma.Asfi_RequestsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.asfi_Files`: Exposes CRUD operations for the **Asfi_Files** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Asfi_Files
    * const asfi_Files = await prisma.asfi_Files.findMany()
    * ```
    */
  get asfi_Files(): Prisma.Asfi_FilesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Asfi_Requests: 'Asfi_Requests',
    Asfi_Files: 'Asfi_Files'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "asfi_Requests" | "asfi_Files"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Asfi_Requests: {
        payload: Prisma.$Asfi_RequestsPayload<ExtArgs>
        fields: Prisma.Asfi_RequestsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Asfi_RequestsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Asfi_RequestsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>
          }
          findFirst: {
            args: Prisma.Asfi_RequestsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Asfi_RequestsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>
          }
          findMany: {
            args: Prisma.Asfi_RequestsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>[]
          }
          create: {
            args: Prisma.Asfi_RequestsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>
          }
          createMany: {
            args: Prisma.Asfi_RequestsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Asfi_RequestsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>[]
          }
          delete: {
            args: Prisma.Asfi_RequestsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>
          }
          update: {
            args: Prisma.Asfi_RequestsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>
          }
          deleteMany: {
            args: Prisma.Asfi_RequestsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Asfi_RequestsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Asfi_RequestsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>[]
          }
          upsert: {
            args: Prisma.Asfi_RequestsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_RequestsPayload>
          }
          aggregate: {
            args: Prisma.Asfi_RequestsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAsfi_Requests>
          }
          groupBy: {
            args: Prisma.Asfi_RequestsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Asfi_RequestsGroupByOutputType>[]
          }
          count: {
            args: Prisma.Asfi_RequestsCountArgs<ExtArgs>
            result: $Utils.Optional<Asfi_RequestsCountAggregateOutputType> | number
          }
        }
      }
      Asfi_Files: {
        payload: Prisma.$Asfi_FilesPayload<ExtArgs>
        fields: Prisma.Asfi_FilesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Asfi_FilesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Asfi_FilesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>
          }
          findFirst: {
            args: Prisma.Asfi_FilesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Asfi_FilesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>
          }
          findMany: {
            args: Prisma.Asfi_FilesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>[]
          }
          create: {
            args: Prisma.Asfi_FilesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>
          }
          createMany: {
            args: Prisma.Asfi_FilesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.Asfi_FilesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>[]
          }
          delete: {
            args: Prisma.Asfi_FilesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>
          }
          update: {
            args: Prisma.Asfi_FilesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>
          }
          deleteMany: {
            args: Prisma.Asfi_FilesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Asfi_FilesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.Asfi_FilesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>[]
          }
          upsert: {
            args: Prisma.Asfi_FilesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Asfi_FilesPayload>
          }
          aggregate: {
            args: Prisma.Asfi_FilesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAsfi_Files>
          }
          groupBy: {
            args: Prisma.Asfi_FilesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Asfi_FilesGroupByOutputType>[]
          }
          count: {
            args: Prisma.Asfi_FilesCountArgs<ExtArgs>
            result: $Utils.Optional<Asfi_FilesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    asfi_Requests?: Asfi_RequestsOmit
    asfi_Files?: Asfi_FilesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Asfi_Requests
   */

  export type AggregateAsfi_Requests = {
    _count: Asfi_RequestsCountAggregateOutputType | null
    _avg: Asfi_RequestsAvgAggregateOutputType | null
    _sum: Asfi_RequestsSumAggregateOutputType | null
    _min: Asfi_RequestsMinAggregateOutputType | null
    _max: Asfi_RequestsMaxAggregateOutputType | null
  }

  export type Asfi_RequestsAvgAggregateOutputType = {
    id: number | null
    quantity_detail: number | null
  }

  export type Asfi_RequestsSumAggregateOutputType = {
    id: number | null
    quantity_detail: number | null
  }

  export type Asfi_RequestsMinAggregateOutputType = {
    id: number | null
    authority_position: string | null
    requesting_authority: string | null
    request_code: string | null
    department: string | null
    process_type: $Enums.ProccesType | null
    quantity_detail: number | null
    sent_date: Date | null
    user_name: string | null
  }

  export type Asfi_RequestsMaxAggregateOutputType = {
    id: number | null
    authority_position: string | null
    requesting_authority: string | null
    request_code: string | null
    department: string | null
    process_type: $Enums.ProccesType | null
    quantity_detail: number | null
    sent_date: Date | null
    user_name: string | null
  }

  export type Asfi_RequestsCountAggregateOutputType = {
    id: number
    authority_position: number
    requesting_authority: number
    request_code: number
    department: number
    process_type: number
    quantity_detail: number
    sent_date: number
    user_name: number
    _all: number
  }


  export type Asfi_RequestsAvgAggregateInputType = {
    id?: true
    quantity_detail?: true
  }

  export type Asfi_RequestsSumAggregateInputType = {
    id?: true
    quantity_detail?: true
  }

  export type Asfi_RequestsMinAggregateInputType = {
    id?: true
    authority_position?: true
    requesting_authority?: true
    request_code?: true
    department?: true
    process_type?: true
    quantity_detail?: true
    sent_date?: true
    user_name?: true
  }

  export type Asfi_RequestsMaxAggregateInputType = {
    id?: true
    authority_position?: true
    requesting_authority?: true
    request_code?: true
    department?: true
    process_type?: true
    quantity_detail?: true
    sent_date?: true
    user_name?: true
  }

  export type Asfi_RequestsCountAggregateInputType = {
    id?: true
    authority_position?: true
    requesting_authority?: true
    request_code?: true
    department?: true
    process_type?: true
    quantity_detail?: true
    sent_date?: true
    user_name?: true
    _all?: true
  }

  export type Asfi_RequestsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asfi_Requests to aggregate.
     */
    where?: Asfi_RequestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asfi_Requests to fetch.
     */
    orderBy?: Asfi_RequestsOrderByWithRelationInput | Asfi_RequestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Asfi_RequestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asfi_Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asfi_Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Asfi_Requests
    **/
    _count?: true | Asfi_RequestsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Asfi_RequestsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Asfi_RequestsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Asfi_RequestsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Asfi_RequestsMaxAggregateInputType
  }

  export type GetAsfi_RequestsAggregateType<T extends Asfi_RequestsAggregateArgs> = {
        [P in keyof T & keyof AggregateAsfi_Requests]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsfi_Requests[P]>
      : GetScalarType<T[P], AggregateAsfi_Requests[P]>
  }




  export type Asfi_RequestsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Asfi_RequestsWhereInput
    orderBy?: Asfi_RequestsOrderByWithAggregationInput | Asfi_RequestsOrderByWithAggregationInput[]
    by: Asfi_RequestsScalarFieldEnum[] | Asfi_RequestsScalarFieldEnum
    having?: Asfi_RequestsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Asfi_RequestsCountAggregateInputType | true
    _avg?: Asfi_RequestsAvgAggregateInputType
    _sum?: Asfi_RequestsSumAggregateInputType
    _min?: Asfi_RequestsMinAggregateInputType
    _max?: Asfi_RequestsMaxAggregateInputType
  }

  export type Asfi_RequestsGroupByOutputType = {
    id: number
    authority_position: string
    requesting_authority: string
    request_code: string
    department: string
    process_type: $Enums.ProccesType
    quantity_detail: number
    sent_date: Date
    user_name: string
    _count: Asfi_RequestsCountAggregateOutputType | null
    _avg: Asfi_RequestsAvgAggregateOutputType | null
    _sum: Asfi_RequestsSumAggregateOutputType | null
    _min: Asfi_RequestsMinAggregateOutputType | null
    _max: Asfi_RequestsMaxAggregateOutputType | null
  }

  type GetAsfi_RequestsGroupByPayload<T extends Asfi_RequestsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Asfi_RequestsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Asfi_RequestsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Asfi_RequestsGroupByOutputType[P]>
            : GetScalarType<T[P], Asfi_RequestsGroupByOutputType[P]>
        }
      >
    >


  export type Asfi_RequestsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authority_position?: boolean
    requesting_authority?: boolean
    request_code?: boolean
    department?: boolean
    process_type?: boolean
    quantity_detail?: boolean
    sent_date?: boolean
    user_name?: boolean
    Asfi_Files?: boolean | Asfi_Requests$Asfi_FilesArgs<ExtArgs>
  }, ExtArgs["result"]["asfi_Requests"]>

  export type Asfi_RequestsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authority_position?: boolean
    requesting_authority?: boolean
    request_code?: boolean
    department?: boolean
    process_type?: boolean
    quantity_detail?: boolean
    sent_date?: boolean
    user_name?: boolean
  }, ExtArgs["result"]["asfi_Requests"]>

  export type Asfi_RequestsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authority_position?: boolean
    requesting_authority?: boolean
    request_code?: boolean
    department?: boolean
    process_type?: boolean
    quantity_detail?: boolean
    sent_date?: boolean
    user_name?: boolean
  }, ExtArgs["result"]["asfi_Requests"]>

  export type Asfi_RequestsSelectScalar = {
    id?: boolean
    authority_position?: boolean
    requesting_authority?: boolean
    request_code?: boolean
    department?: boolean
    process_type?: boolean
    quantity_detail?: boolean
    sent_date?: boolean
    user_name?: boolean
  }

  export type Asfi_RequestsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authority_position" | "requesting_authority" | "request_code" | "department" | "process_type" | "quantity_detail" | "sent_date" | "user_name", ExtArgs["result"]["asfi_Requests"]>
  export type Asfi_RequestsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Asfi_Files?: boolean | Asfi_Requests$Asfi_FilesArgs<ExtArgs>
  }
  export type Asfi_RequestsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type Asfi_RequestsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $Asfi_RequestsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Asfi_Requests"
    objects: {
      Asfi_Files: Prisma.$Asfi_FilesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      authority_position: string
      requesting_authority: string
      request_code: string
      department: string
      process_type: $Enums.ProccesType
      quantity_detail: number
      sent_date: Date
      user_name: string
    }, ExtArgs["result"]["asfi_Requests"]>
    composites: {}
  }

  type Asfi_RequestsGetPayload<S extends boolean | null | undefined | Asfi_RequestsDefaultArgs> = $Result.GetResult<Prisma.$Asfi_RequestsPayload, S>

  type Asfi_RequestsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Asfi_RequestsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Asfi_RequestsCountAggregateInputType | true
    }

  export interface Asfi_RequestsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Asfi_Requests'], meta: { name: 'Asfi_Requests' } }
    /**
     * Find zero or one Asfi_Requests that matches the filter.
     * @param {Asfi_RequestsFindUniqueArgs} args - Arguments to find a Asfi_Requests
     * @example
     * // Get one Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Asfi_RequestsFindUniqueArgs>(args: SelectSubset<T, Asfi_RequestsFindUniqueArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Asfi_Requests that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Asfi_RequestsFindUniqueOrThrowArgs} args - Arguments to find a Asfi_Requests
     * @example
     * // Get one Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Asfi_RequestsFindUniqueOrThrowArgs>(args: SelectSubset<T, Asfi_RequestsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asfi_Requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_RequestsFindFirstArgs} args - Arguments to find a Asfi_Requests
     * @example
     * // Get one Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Asfi_RequestsFindFirstArgs>(args?: SelectSubset<T, Asfi_RequestsFindFirstArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asfi_Requests that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_RequestsFindFirstOrThrowArgs} args - Arguments to find a Asfi_Requests
     * @example
     * // Get one Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Asfi_RequestsFindFirstOrThrowArgs>(args?: SelectSubset<T, Asfi_RequestsFindFirstOrThrowArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Asfi_Requests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_RequestsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.findMany()
     * 
     * // Get first 10 Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const asfi_RequestsWithIdOnly = await prisma.asfi_Requests.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Asfi_RequestsFindManyArgs>(args?: SelectSubset<T, Asfi_RequestsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Asfi_Requests.
     * @param {Asfi_RequestsCreateArgs} args - Arguments to create a Asfi_Requests.
     * @example
     * // Create one Asfi_Requests
     * const Asfi_Requests = await prisma.asfi_Requests.create({
     *   data: {
     *     // ... data to create a Asfi_Requests
     *   }
     * })
     * 
     */
    create<T extends Asfi_RequestsCreateArgs>(args: SelectSubset<T, Asfi_RequestsCreateArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Asfi_Requests.
     * @param {Asfi_RequestsCreateManyArgs} args - Arguments to create many Asfi_Requests.
     * @example
     * // Create many Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Asfi_RequestsCreateManyArgs>(args?: SelectSubset<T, Asfi_RequestsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Asfi_Requests and returns the data saved in the database.
     * @param {Asfi_RequestsCreateManyAndReturnArgs} args - Arguments to create many Asfi_Requests.
     * @example
     * // Create many Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Asfi_Requests and only return the `id`
     * const asfi_RequestsWithIdOnly = await prisma.asfi_Requests.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Asfi_RequestsCreateManyAndReturnArgs>(args?: SelectSubset<T, Asfi_RequestsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Asfi_Requests.
     * @param {Asfi_RequestsDeleteArgs} args - Arguments to delete one Asfi_Requests.
     * @example
     * // Delete one Asfi_Requests
     * const Asfi_Requests = await prisma.asfi_Requests.delete({
     *   where: {
     *     // ... filter to delete one Asfi_Requests
     *   }
     * })
     * 
     */
    delete<T extends Asfi_RequestsDeleteArgs>(args: SelectSubset<T, Asfi_RequestsDeleteArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Asfi_Requests.
     * @param {Asfi_RequestsUpdateArgs} args - Arguments to update one Asfi_Requests.
     * @example
     * // Update one Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Asfi_RequestsUpdateArgs>(args: SelectSubset<T, Asfi_RequestsUpdateArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Asfi_Requests.
     * @param {Asfi_RequestsDeleteManyArgs} args - Arguments to filter Asfi_Requests to delete.
     * @example
     * // Delete a few Asfi_Requests
     * const { count } = await prisma.asfi_Requests.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Asfi_RequestsDeleteManyArgs>(args?: SelectSubset<T, Asfi_RequestsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Asfi_Requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_RequestsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Asfi_RequestsUpdateManyArgs>(args: SelectSubset<T, Asfi_RequestsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Asfi_Requests and returns the data updated in the database.
     * @param {Asfi_RequestsUpdateManyAndReturnArgs} args - Arguments to update many Asfi_Requests.
     * @example
     * // Update many Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Asfi_Requests and only return the `id`
     * const asfi_RequestsWithIdOnly = await prisma.asfi_Requests.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Asfi_RequestsUpdateManyAndReturnArgs>(args: SelectSubset<T, Asfi_RequestsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Asfi_Requests.
     * @param {Asfi_RequestsUpsertArgs} args - Arguments to update or create a Asfi_Requests.
     * @example
     * // Update or create a Asfi_Requests
     * const asfi_Requests = await prisma.asfi_Requests.upsert({
     *   create: {
     *     // ... data to create a Asfi_Requests
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asfi_Requests we want to update
     *   }
     * })
     */
    upsert<T extends Asfi_RequestsUpsertArgs>(args: SelectSubset<T, Asfi_RequestsUpsertArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Asfi_Requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_RequestsCountArgs} args - Arguments to filter Asfi_Requests to count.
     * @example
     * // Count the number of Asfi_Requests
     * const count = await prisma.asfi_Requests.count({
     *   where: {
     *     // ... the filter for the Asfi_Requests we want to count
     *   }
     * })
    **/
    count<T extends Asfi_RequestsCountArgs>(
      args?: Subset<T, Asfi_RequestsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Asfi_RequestsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asfi_Requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_RequestsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Asfi_RequestsAggregateArgs>(args: Subset<T, Asfi_RequestsAggregateArgs>): Prisma.PrismaPromise<GetAsfi_RequestsAggregateType<T>>

    /**
     * Group by Asfi_Requests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_RequestsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Asfi_RequestsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Asfi_RequestsGroupByArgs['orderBy'] }
        : { orderBy?: Asfi_RequestsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Asfi_RequestsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAsfi_RequestsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Asfi_Requests model
   */
  readonly fields: Asfi_RequestsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Asfi_Requests.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Asfi_RequestsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Asfi_Files<T extends Asfi_Requests$Asfi_FilesArgs<ExtArgs> = {}>(args?: Subset<T, Asfi_Requests$Asfi_FilesArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Asfi_Requests model
   */
  interface Asfi_RequestsFieldRefs {
    readonly id: FieldRef<"Asfi_Requests", 'Int'>
    readonly authority_position: FieldRef<"Asfi_Requests", 'String'>
    readonly requesting_authority: FieldRef<"Asfi_Requests", 'String'>
    readonly request_code: FieldRef<"Asfi_Requests", 'String'>
    readonly department: FieldRef<"Asfi_Requests", 'String'>
    readonly process_type: FieldRef<"Asfi_Requests", 'ProccesType'>
    readonly quantity_detail: FieldRef<"Asfi_Requests", 'Int'>
    readonly sent_date: FieldRef<"Asfi_Requests", 'DateTime'>
    readonly user_name: FieldRef<"Asfi_Requests", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Asfi_Requests findUnique
   */
  export type Asfi_RequestsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Requests to fetch.
     */
    where: Asfi_RequestsWhereUniqueInput
  }

  /**
   * Asfi_Requests findUniqueOrThrow
   */
  export type Asfi_RequestsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Requests to fetch.
     */
    where: Asfi_RequestsWhereUniqueInput
  }

  /**
   * Asfi_Requests findFirst
   */
  export type Asfi_RequestsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Requests to fetch.
     */
    where?: Asfi_RequestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asfi_Requests to fetch.
     */
    orderBy?: Asfi_RequestsOrderByWithRelationInput | Asfi_RequestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Asfi_Requests.
     */
    cursor?: Asfi_RequestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asfi_Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asfi_Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Asfi_Requests.
     */
    distinct?: Asfi_RequestsScalarFieldEnum | Asfi_RequestsScalarFieldEnum[]
  }

  /**
   * Asfi_Requests findFirstOrThrow
   */
  export type Asfi_RequestsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Requests to fetch.
     */
    where?: Asfi_RequestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asfi_Requests to fetch.
     */
    orderBy?: Asfi_RequestsOrderByWithRelationInput | Asfi_RequestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Asfi_Requests.
     */
    cursor?: Asfi_RequestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asfi_Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asfi_Requests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Asfi_Requests.
     */
    distinct?: Asfi_RequestsScalarFieldEnum | Asfi_RequestsScalarFieldEnum[]
  }

  /**
   * Asfi_Requests findMany
   */
  export type Asfi_RequestsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Requests to fetch.
     */
    where?: Asfi_RequestsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asfi_Requests to fetch.
     */
    orderBy?: Asfi_RequestsOrderByWithRelationInput | Asfi_RequestsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Asfi_Requests.
     */
    cursor?: Asfi_RequestsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asfi_Requests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asfi_Requests.
     */
    skip?: number
    distinct?: Asfi_RequestsScalarFieldEnum | Asfi_RequestsScalarFieldEnum[]
  }

  /**
   * Asfi_Requests create
   */
  export type Asfi_RequestsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * The data needed to create a Asfi_Requests.
     */
    data: XOR<Asfi_RequestsCreateInput, Asfi_RequestsUncheckedCreateInput>
  }

  /**
   * Asfi_Requests createMany
   */
  export type Asfi_RequestsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Asfi_Requests.
     */
    data: Asfi_RequestsCreateManyInput | Asfi_RequestsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asfi_Requests createManyAndReturn
   */
  export type Asfi_RequestsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * The data used to create many Asfi_Requests.
     */
    data: Asfi_RequestsCreateManyInput | Asfi_RequestsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asfi_Requests update
   */
  export type Asfi_RequestsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * The data needed to update a Asfi_Requests.
     */
    data: XOR<Asfi_RequestsUpdateInput, Asfi_RequestsUncheckedUpdateInput>
    /**
     * Choose, which Asfi_Requests to update.
     */
    where: Asfi_RequestsWhereUniqueInput
  }

  /**
   * Asfi_Requests updateMany
   */
  export type Asfi_RequestsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Asfi_Requests.
     */
    data: XOR<Asfi_RequestsUpdateManyMutationInput, Asfi_RequestsUncheckedUpdateManyInput>
    /**
     * Filter which Asfi_Requests to update
     */
    where?: Asfi_RequestsWhereInput
    /**
     * Limit how many Asfi_Requests to update.
     */
    limit?: number
  }

  /**
   * Asfi_Requests updateManyAndReturn
   */
  export type Asfi_RequestsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * The data used to update Asfi_Requests.
     */
    data: XOR<Asfi_RequestsUpdateManyMutationInput, Asfi_RequestsUncheckedUpdateManyInput>
    /**
     * Filter which Asfi_Requests to update
     */
    where?: Asfi_RequestsWhereInput
    /**
     * Limit how many Asfi_Requests to update.
     */
    limit?: number
  }

  /**
   * Asfi_Requests upsert
   */
  export type Asfi_RequestsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * The filter to search for the Asfi_Requests to update in case it exists.
     */
    where: Asfi_RequestsWhereUniqueInput
    /**
     * In case the Asfi_Requests found by the `where` argument doesn't exist, create a new Asfi_Requests with this data.
     */
    create: XOR<Asfi_RequestsCreateInput, Asfi_RequestsUncheckedCreateInput>
    /**
     * In case the Asfi_Requests was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Asfi_RequestsUpdateInput, Asfi_RequestsUncheckedUpdateInput>
  }

  /**
   * Asfi_Requests delete
   */
  export type Asfi_RequestsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
    /**
     * Filter which Asfi_Requests to delete.
     */
    where: Asfi_RequestsWhereUniqueInput
  }

  /**
   * Asfi_Requests deleteMany
   */
  export type Asfi_RequestsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asfi_Requests to delete
     */
    where?: Asfi_RequestsWhereInput
    /**
     * Limit how many Asfi_Requests to delete.
     */
    limit?: number
  }

  /**
   * Asfi_Requests.Asfi_Files
   */
  export type Asfi_Requests$Asfi_FilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    where?: Asfi_FilesWhereInput
  }

  /**
   * Asfi_Requests without action
   */
  export type Asfi_RequestsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Requests
     */
    select?: Asfi_RequestsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Requests
     */
    omit?: Asfi_RequestsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_RequestsInclude<ExtArgs> | null
  }


  /**
   * Model Asfi_Files
   */

  export type AggregateAsfi_Files = {
    _count: Asfi_FilesCountAggregateOutputType | null
    _avg: Asfi_FilesAvgAggregateOutputType | null
    _sum: Asfi_FilesSumAggregateOutputType | null
    _min: Asfi_FilesMinAggregateOutputType | null
    _max: Asfi_FilesMaxAggregateOutputType | null
  }

  export type Asfi_FilesAvgAggregateOutputType = {
    id: number | null
    asfi_request_id: number | null
  }

  export type Asfi_FilesSumAggregateOutputType = {
    id: number | null
    asfi_request_id: number | null
  }

  export type Asfi_FilesMinAggregateOutputType = {
    id: number | null
    file_name: string | null
    file_url: string | null
    asfi_request_id: number | null
  }

  export type Asfi_FilesMaxAggregateOutputType = {
    id: number | null
    file_name: string | null
    file_url: string | null
    asfi_request_id: number | null
  }

  export type Asfi_FilesCountAggregateOutputType = {
    id: number
    file_name: number
    file_url: number
    asfi_request_id: number
    _all: number
  }


  export type Asfi_FilesAvgAggregateInputType = {
    id?: true
    asfi_request_id?: true
  }

  export type Asfi_FilesSumAggregateInputType = {
    id?: true
    asfi_request_id?: true
  }

  export type Asfi_FilesMinAggregateInputType = {
    id?: true
    file_name?: true
    file_url?: true
    asfi_request_id?: true
  }

  export type Asfi_FilesMaxAggregateInputType = {
    id?: true
    file_name?: true
    file_url?: true
    asfi_request_id?: true
  }

  export type Asfi_FilesCountAggregateInputType = {
    id?: true
    file_name?: true
    file_url?: true
    asfi_request_id?: true
    _all?: true
  }

  export type Asfi_FilesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asfi_Files to aggregate.
     */
    where?: Asfi_FilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asfi_Files to fetch.
     */
    orderBy?: Asfi_FilesOrderByWithRelationInput | Asfi_FilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Asfi_FilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asfi_Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asfi_Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Asfi_Files
    **/
    _count?: true | Asfi_FilesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Asfi_FilesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Asfi_FilesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Asfi_FilesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Asfi_FilesMaxAggregateInputType
  }

  export type GetAsfi_FilesAggregateType<T extends Asfi_FilesAggregateArgs> = {
        [P in keyof T & keyof AggregateAsfi_Files]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAsfi_Files[P]>
      : GetScalarType<T[P], AggregateAsfi_Files[P]>
  }




  export type Asfi_FilesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Asfi_FilesWhereInput
    orderBy?: Asfi_FilesOrderByWithAggregationInput | Asfi_FilesOrderByWithAggregationInput[]
    by: Asfi_FilesScalarFieldEnum[] | Asfi_FilesScalarFieldEnum
    having?: Asfi_FilesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Asfi_FilesCountAggregateInputType | true
    _avg?: Asfi_FilesAvgAggregateInputType
    _sum?: Asfi_FilesSumAggregateInputType
    _min?: Asfi_FilesMinAggregateInputType
    _max?: Asfi_FilesMaxAggregateInputType
  }

  export type Asfi_FilesGroupByOutputType = {
    id: number
    file_name: string
    file_url: string
    asfi_request_id: number
    _count: Asfi_FilesCountAggregateOutputType | null
    _avg: Asfi_FilesAvgAggregateOutputType | null
    _sum: Asfi_FilesSumAggregateOutputType | null
    _min: Asfi_FilesMinAggregateOutputType | null
    _max: Asfi_FilesMaxAggregateOutputType | null
  }

  type GetAsfi_FilesGroupByPayload<T extends Asfi_FilesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Asfi_FilesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Asfi_FilesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Asfi_FilesGroupByOutputType[P]>
            : GetScalarType<T[P], Asfi_FilesGroupByOutputType[P]>
        }
      >
    >


  export type Asfi_FilesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    file_name?: boolean
    file_url?: boolean
    asfi_request_id?: boolean
    asfi_request?: boolean | Asfi_RequestsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asfi_Files"]>

  export type Asfi_FilesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    file_name?: boolean
    file_url?: boolean
    asfi_request_id?: boolean
    asfi_request?: boolean | Asfi_RequestsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asfi_Files"]>

  export type Asfi_FilesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    file_name?: boolean
    file_url?: boolean
    asfi_request_id?: boolean
    asfi_request?: boolean | Asfi_RequestsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["asfi_Files"]>

  export type Asfi_FilesSelectScalar = {
    id?: boolean
    file_name?: boolean
    file_url?: boolean
    asfi_request_id?: boolean
  }

  export type Asfi_FilesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "file_name" | "file_url" | "asfi_request_id", ExtArgs["result"]["asfi_Files"]>
  export type Asfi_FilesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    asfi_request?: boolean | Asfi_RequestsDefaultArgs<ExtArgs>
  }
  export type Asfi_FilesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    asfi_request?: boolean | Asfi_RequestsDefaultArgs<ExtArgs>
  }
  export type Asfi_FilesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    asfi_request?: boolean | Asfi_RequestsDefaultArgs<ExtArgs>
  }

  export type $Asfi_FilesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Asfi_Files"
    objects: {
      asfi_request: Prisma.$Asfi_RequestsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      file_name: string
      file_url: string
      asfi_request_id: number
    }, ExtArgs["result"]["asfi_Files"]>
    composites: {}
  }

  type Asfi_FilesGetPayload<S extends boolean | null | undefined | Asfi_FilesDefaultArgs> = $Result.GetResult<Prisma.$Asfi_FilesPayload, S>

  type Asfi_FilesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Asfi_FilesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Asfi_FilesCountAggregateInputType | true
    }

  export interface Asfi_FilesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Asfi_Files'], meta: { name: 'Asfi_Files' } }
    /**
     * Find zero or one Asfi_Files that matches the filter.
     * @param {Asfi_FilesFindUniqueArgs} args - Arguments to find a Asfi_Files
     * @example
     * // Get one Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Asfi_FilesFindUniqueArgs>(args: SelectSubset<T, Asfi_FilesFindUniqueArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Asfi_Files that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Asfi_FilesFindUniqueOrThrowArgs} args - Arguments to find a Asfi_Files
     * @example
     * // Get one Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Asfi_FilesFindUniqueOrThrowArgs>(args: SelectSubset<T, Asfi_FilesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asfi_Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_FilesFindFirstArgs} args - Arguments to find a Asfi_Files
     * @example
     * // Get one Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Asfi_FilesFindFirstArgs>(args?: SelectSubset<T, Asfi_FilesFindFirstArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Asfi_Files that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_FilesFindFirstOrThrowArgs} args - Arguments to find a Asfi_Files
     * @example
     * // Get one Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Asfi_FilesFindFirstOrThrowArgs>(args?: SelectSubset<T, Asfi_FilesFindFirstOrThrowArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Asfi_Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_FilesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.findMany()
     * 
     * // Get first 10 Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const asfi_FilesWithIdOnly = await prisma.asfi_Files.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Asfi_FilesFindManyArgs>(args?: SelectSubset<T, Asfi_FilesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Asfi_Files.
     * @param {Asfi_FilesCreateArgs} args - Arguments to create a Asfi_Files.
     * @example
     * // Create one Asfi_Files
     * const Asfi_Files = await prisma.asfi_Files.create({
     *   data: {
     *     // ... data to create a Asfi_Files
     *   }
     * })
     * 
     */
    create<T extends Asfi_FilesCreateArgs>(args: SelectSubset<T, Asfi_FilesCreateArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Asfi_Files.
     * @param {Asfi_FilesCreateManyArgs} args - Arguments to create many Asfi_Files.
     * @example
     * // Create many Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Asfi_FilesCreateManyArgs>(args?: SelectSubset<T, Asfi_FilesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Asfi_Files and returns the data saved in the database.
     * @param {Asfi_FilesCreateManyAndReturnArgs} args - Arguments to create many Asfi_Files.
     * @example
     * // Create many Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Asfi_Files and only return the `id`
     * const asfi_FilesWithIdOnly = await prisma.asfi_Files.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends Asfi_FilesCreateManyAndReturnArgs>(args?: SelectSubset<T, Asfi_FilesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Asfi_Files.
     * @param {Asfi_FilesDeleteArgs} args - Arguments to delete one Asfi_Files.
     * @example
     * // Delete one Asfi_Files
     * const Asfi_Files = await prisma.asfi_Files.delete({
     *   where: {
     *     // ... filter to delete one Asfi_Files
     *   }
     * })
     * 
     */
    delete<T extends Asfi_FilesDeleteArgs>(args: SelectSubset<T, Asfi_FilesDeleteArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Asfi_Files.
     * @param {Asfi_FilesUpdateArgs} args - Arguments to update one Asfi_Files.
     * @example
     * // Update one Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Asfi_FilesUpdateArgs>(args: SelectSubset<T, Asfi_FilesUpdateArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Asfi_Files.
     * @param {Asfi_FilesDeleteManyArgs} args - Arguments to filter Asfi_Files to delete.
     * @example
     * // Delete a few Asfi_Files
     * const { count } = await prisma.asfi_Files.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Asfi_FilesDeleteManyArgs>(args?: SelectSubset<T, Asfi_FilesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Asfi_Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_FilesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Asfi_FilesUpdateManyArgs>(args: SelectSubset<T, Asfi_FilesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Asfi_Files and returns the data updated in the database.
     * @param {Asfi_FilesUpdateManyAndReturnArgs} args - Arguments to update many Asfi_Files.
     * @example
     * // Update many Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Asfi_Files and only return the `id`
     * const asfi_FilesWithIdOnly = await prisma.asfi_Files.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends Asfi_FilesUpdateManyAndReturnArgs>(args: SelectSubset<T, Asfi_FilesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Asfi_Files.
     * @param {Asfi_FilesUpsertArgs} args - Arguments to update or create a Asfi_Files.
     * @example
     * // Update or create a Asfi_Files
     * const asfi_Files = await prisma.asfi_Files.upsert({
     *   create: {
     *     // ... data to create a Asfi_Files
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Asfi_Files we want to update
     *   }
     * })
     */
    upsert<T extends Asfi_FilesUpsertArgs>(args: SelectSubset<T, Asfi_FilesUpsertArgs<ExtArgs>>): Prisma__Asfi_FilesClient<$Result.GetResult<Prisma.$Asfi_FilesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Asfi_Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_FilesCountArgs} args - Arguments to filter Asfi_Files to count.
     * @example
     * // Count the number of Asfi_Files
     * const count = await prisma.asfi_Files.count({
     *   where: {
     *     // ... the filter for the Asfi_Files we want to count
     *   }
     * })
    **/
    count<T extends Asfi_FilesCountArgs>(
      args?: Subset<T, Asfi_FilesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Asfi_FilesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Asfi_Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_FilesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Asfi_FilesAggregateArgs>(args: Subset<T, Asfi_FilesAggregateArgs>): Prisma.PrismaPromise<GetAsfi_FilesAggregateType<T>>

    /**
     * Group by Asfi_Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Asfi_FilesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Asfi_FilesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Asfi_FilesGroupByArgs['orderBy'] }
        : { orderBy?: Asfi_FilesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Asfi_FilesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAsfi_FilesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Asfi_Files model
   */
  readonly fields: Asfi_FilesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Asfi_Files.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Asfi_FilesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    asfi_request<T extends Asfi_RequestsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, Asfi_RequestsDefaultArgs<ExtArgs>>): Prisma__Asfi_RequestsClient<$Result.GetResult<Prisma.$Asfi_RequestsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Asfi_Files model
   */
  interface Asfi_FilesFieldRefs {
    readonly id: FieldRef<"Asfi_Files", 'Int'>
    readonly file_name: FieldRef<"Asfi_Files", 'String'>
    readonly file_url: FieldRef<"Asfi_Files", 'String'>
    readonly asfi_request_id: FieldRef<"Asfi_Files", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Asfi_Files findUnique
   */
  export type Asfi_FilesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Files to fetch.
     */
    where: Asfi_FilesWhereUniqueInput
  }

  /**
   * Asfi_Files findUniqueOrThrow
   */
  export type Asfi_FilesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Files to fetch.
     */
    where: Asfi_FilesWhereUniqueInput
  }

  /**
   * Asfi_Files findFirst
   */
  export type Asfi_FilesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Files to fetch.
     */
    where?: Asfi_FilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asfi_Files to fetch.
     */
    orderBy?: Asfi_FilesOrderByWithRelationInput | Asfi_FilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Asfi_Files.
     */
    cursor?: Asfi_FilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asfi_Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asfi_Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Asfi_Files.
     */
    distinct?: Asfi_FilesScalarFieldEnum | Asfi_FilesScalarFieldEnum[]
  }

  /**
   * Asfi_Files findFirstOrThrow
   */
  export type Asfi_FilesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Files to fetch.
     */
    where?: Asfi_FilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asfi_Files to fetch.
     */
    orderBy?: Asfi_FilesOrderByWithRelationInput | Asfi_FilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Asfi_Files.
     */
    cursor?: Asfi_FilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asfi_Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asfi_Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Asfi_Files.
     */
    distinct?: Asfi_FilesScalarFieldEnum | Asfi_FilesScalarFieldEnum[]
  }

  /**
   * Asfi_Files findMany
   */
  export type Asfi_FilesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * Filter, which Asfi_Files to fetch.
     */
    where?: Asfi_FilesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Asfi_Files to fetch.
     */
    orderBy?: Asfi_FilesOrderByWithRelationInput | Asfi_FilesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Asfi_Files.
     */
    cursor?: Asfi_FilesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Asfi_Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Asfi_Files.
     */
    skip?: number
    distinct?: Asfi_FilesScalarFieldEnum | Asfi_FilesScalarFieldEnum[]
  }

  /**
   * Asfi_Files create
   */
  export type Asfi_FilesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * The data needed to create a Asfi_Files.
     */
    data: XOR<Asfi_FilesCreateInput, Asfi_FilesUncheckedCreateInput>
  }

  /**
   * Asfi_Files createMany
   */
  export type Asfi_FilesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Asfi_Files.
     */
    data: Asfi_FilesCreateManyInput | Asfi_FilesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Asfi_Files createManyAndReturn
   */
  export type Asfi_FilesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * The data used to create many Asfi_Files.
     */
    data: Asfi_FilesCreateManyInput | Asfi_FilesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Asfi_Files update
   */
  export type Asfi_FilesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * The data needed to update a Asfi_Files.
     */
    data: XOR<Asfi_FilesUpdateInput, Asfi_FilesUncheckedUpdateInput>
    /**
     * Choose, which Asfi_Files to update.
     */
    where: Asfi_FilesWhereUniqueInput
  }

  /**
   * Asfi_Files updateMany
   */
  export type Asfi_FilesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Asfi_Files.
     */
    data: XOR<Asfi_FilesUpdateManyMutationInput, Asfi_FilesUncheckedUpdateManyInput>
    /**
     * Filter which Asfi_Files to update
     */
    where?: Asfi_FilesWhereInput
    /**
     * Limit how many Asfi_Files to update.
     */
    limit?: number
  }

  /**
   * Asfi_Files updateManyAndReturn
   */
  export type Asfi_FilesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * The data used to update Asfi_Files.
     */
    data: XOR<Asfi_FilesUpdateManyMutationInput, Asfi_FilesUncheckedUpdateManyInput>
    /**
     * Filter which Asfi_Files to update
     */
    where?: Asfi_FilesWhereInput
    /**
     * Limit how many Asfi_Files to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Asfi_Files upsert
   */
  export type Asfi_FilesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * The filter to search for the Asfi_Files to update in case it exists.
     */
    where: Asfi_FilesWhereUniqueInput
    /**
     * In case the Asfi_Files found by the `where` argument doesn't exist, create a new Asfi_Files with this data.
     */
    create: XOR<Asfi_FilesCreateInput, Asfi_FilesUncheckedCreateInput>
    /**
     * In case the Asfi_Files was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Asfi_FilesUpdateInput, Asfi_FilesUncheckedUpdateInput>
  }

  /**
   * Asfi_Files delete
   */
  export type Asfi_FilesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
    /**
     * Filter which Asfi_Files to delete.
     */
    where: Asfi_FilesWhereUniqueInput
  }

  /**
   * Asfi_Files deleteMany
   */
  export type Asfi_FilesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Asfi_Files to delete
     */
    where?: Asfi_FilesWhereInput
    /**
     * Limit how many Asfi_Files to delete.
     */
    limit?: number
  }

  /**
   * Asfi_Files without action
   */
  export type Asfi_FilesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Asfi_Files
     */
    select?: Asfi_FilesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Asfi_Files
     */
    omit?: Asfi_FilesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Asfi_FilesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Asfi_RequestsScalarFieldEnum: {
    id: 'id',
    authority_position: 'authority_position',
    requesting_authority: 'requesting_authority',
    request_code: 'request_code',
    department: 'department',
    process_type: 'process_type',
    quantity_detail: 'quantity_detail',
    sent_date: 'sent_date',
    user_name: 'user_name'
  };

  export type Asfi_RequestsScalarFieldEnum = (typeof Asfi_RequestsScalarFieldEnum)[keyof typeof Asfi_RequestsScalarFieldEnum]


  export const Asfi_FilesScalarFieldEnum: {
    id: 'id',
    file_name: 'file_name',
    file_url: 'file_url',
    asfi_request_id: 'asfi_request_id'
  };

  export type Asfi_FilesScalarFieldEnum = (typeof Asfi_FilesScalarFieldEnum)[keyof typeof Asfi_FilesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'ProccesType'
   */
  export type EnumProccesTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProccesType'>
    


  /**
   * Reference to a field of type 'ProccesType[]'
   */
  export type ListEnumProccesTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProccesType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type Asfi_RequestsWhereInput = {
    AND?: Asfi_RequestsWhereInput | Asfi_RequestsWhereInput[]
    OR?: Asfi_RequestsWhereInput[]
    NOT?: Asfi_RequestsWhereInput | Asfi_RequestsWhereInput[]
    id?: IntFilter<"Asfi_Requests"> | number
    authority_position?: StringFilter<"Asfi_Requests"> | string
    requesting_authority?: StringFilter<"Asfi_Requests"> | string
    request_code?: StringFilter<"Asfi_Requests"> | string
    department?: StringFilter<"Asfi_Requests"> | string
    process_type?: EnumProccesTypeFilter<"Asfi_Requests"> | $Enums.ProccesType
    quantity_detail?: IntFilter<"Asfi_Requests"> | number
    sent_date?: DateTimeFilter<"Asfi_Requests"> | Date | string
    user_name?: StringFilter<"Asfi_Requests"> | string
    Asfi_Files?: XOR<Asfi_FilesNullableScalarRelationFilter, Asfi_FilesWhereInput> | null
  }

  export type Asfi_RequestsOrderByWithRelationInput = {
    id?: SortOrder
    authority_position?: SortOrder
    requesting_authority?: SortOrder
    request_code?: SortOrder
    department?: SortOrder
    process_type?: SortOrder
    quantity_detail?: SortOrder
    sent_date?: SortOrder
    user_name?: SortOrder
    Asfi_Files?: Asfi_FilesOrderByWithRelationInput
  }

  export type Asfi_RequestsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    request_code?: string
    AND?: Asfi_RequestsWhereInput | Asfi_RequestsWhereInput[]
    OR?: Asfi_RequestsWhereInput[]
    NOT?: Asfi_RequestsWhereInput | Asfi_RequestsWhereInput[]
    authority_position?: StringFilter<"Asfi_Requests"> | string
    requesting_authority?: StringFilter<"Asfi_Requests"> | string
    department?: StringFilter<"Asfi_Requests"> | string
    process_type?: EnumProccesTypeFilter<"Asfi_Requests"> | $Enums.ProccesType
    quantity_detail?: IntFilter<"Asfi_Requests"> | number
    sent_date?: DateTimeFilter<"Asfi_Requests"> | Date | string
    user_name?: StringFilter<"Asfi_Requests"> | string
    Asfi_Files?: XOR<Asfi_FilesNullableScalarRelationFilter, Asfi_FilesWhereInput> | null
  }, "id" | "request_code">

  export type Asfi_RequestsOrderByWithAggregationInput = {
    id?: SortOrder
    authority_position?: SortOrder
    requesting_authority?: SortOrder
    request_code?: SortOrder
    department?: SortOrder
    process_type?: SortOrder
    quantity_detail?: SortOrder
    sent_date?: SortOrder
    user_name?: SortOrder
    _count?: Asfi_RequestsCountOrderByAggregateInput
    _avg?: Asfi_RequestsAvgOrderByAggregateInput
    _max?: Asfi_RequestsMaxOrderByAggregateInput
    _min?: Asfi_RequestsMinOrderByAggregateInput
    _sum?: Asfi_RequestsSumOrderByAggregateInput
  }

  export type Asfi_RequestsScalarWhereWithAggregatesInput = {
    AND?: Asfi_RequestsScalarWhereWithAggregatesInput | Asfi_RequestsScalarWhereWithAggregatesInput[]
    OR?: Asfi_RequestsScalarWhereWithAggregatesInput[]
    NOT?: Asfi_RequestsScalarWhereWithAggregatesInput | Asfi_RequestsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Asfi_Requests"> | number
    authority_position?: StringWithAggregatesFilter<"Asfi_Requests"> | string
    requesting_authority?: StringWithAggregatesFilter<"Asfi_Requests"> | string
    request_code?: StringWithAggregatesFilter<"Asfi_Requests"> | string
    department?: StringWithAggregatesFilter<"Asfi_Requests"> | string
    process_type?: EnumProccesTypeWithAggregatesFilter<"Asfi_Requests"> | $Enums.ProccesType
    quantity_detail?: IntWithAggregatesFilter<"Asfi_Requests"> | number
    sent_date?: DateTimeWithAggregatesFilter<"Asfi_Requests"> | Date | string
    user_name?: StringWithAggregatesFilter<"Asfi_Requests"> | string
  }

  export type Asfi_FilesWhereInput = {
    AND?: Asfi_FilesWhereInput | Asfi_FilesWhereInput[]
    OR?: Asfi_FilesWhereInput[]
    NOT?: Asfi_FilesWhereInput | Asfi_FilesWhereInput[]
    id?: IntFilter<"Asfi_Files"> | number
    file_name?: StringFilter<"Asfi_Files"> | string
    file_url?: StringFilter<"Asfi_Files"> | string
    asfi_request_id?: IntFilter<"Asfi_Files"> | number
    asfi_request?: XOR<Asfi_RequestsScalarRelationFilter, Asfi_RequestsWhereInput>
  }

  export type Asfi_FilesOrderByWithRelationInput = {
    id?: SortOrder
    file_name?: SortOrder
    file_url?: SortOrder
    asfi_request_id?: SortOrder
    asfi_request?: Asfi_RequestsOrderByWithRelationInput
  }

  export type Asfi_FilesWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    asfi_request_id?: number
    AND?: Asfi_FilesWhereInput | Asfi_FilesWhereInput[]
    OR?: Asfi_FilesWhereInput[]
    NOT?: Asfi_FilesWhereInput | Asfi_FilesWhereInput[]
    file_name?: StringFilter<"Asfi_Files"> | string
    file_url?: StringFilter<"Asfi_Files"> | string
    asfi_request?: XOR<Asfi_RequestsScalarRelationFilter, Asfi_RequestsWhereInput>
  }, "id" | "asfi_request_id">

  export type Asfi_FilesOrderByWithAggregationInput = {
    id?: SortOrder
    file_name?: SortOrder
    file_url?: SortOrder
    asfi_request_id?: SortOrder
    _count?: Asfi_FilesCountOrderByAggregateInput
    _avg?: Asfi_FilesAvgOrderByAggregateInput
    _max?: Asfi_FilesMaxOrderByAggregateInput
    _min?: Asfi_FilesMinOrderByAggregateInput
    _sum?: Asfi_FilesSumOrderByAggregateInput
  }

  export type Asfi_FilesScalarWhereWithAggregatesInput = {
    AND?: Asfi_FilesScalarWhereWithAggregatesInput | Asfi_FilesScalarWhereWithAggregatesInput[]
    OR?: Asfi_FilesScalarWhereWithAggregatesInput[]
    NOT?: Asfi_FilesScalarWhereWithAggregatesInput | Asfi_FilesScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Asfi_Files"> | number
    file_name?: StringWithAggregatesFilter<"Asfi_Files"> | string
    file_url?: StringWithAggregatesFilter<"Asfi_Files"> | string
    asfi_request_id?: IntWithAggregatesFilter<"Asfi_Files"> | number
  }

  export type Asfi_RequestsCreateInput = {
    authority_position: string
    requesting_authority: string
    request_code: string
    department: string
    process_type: $Enums.ProccesType
    quantity_detail: number
    sent_date: Date | string
    user_name: string
    Asfi_Files?: Asfi_FilesCreateNestedOneWithoutAsfi_requestInput
  }

  export type Asfi_RequestsUncheckedCreateInput = {
    id?: number
    authority_position: string
    requesting_authority: string
    request_code: string
    department: string
    process_type: $Enums.ProccesType
    quantity_detail: number
    sent_date: Date | string
    user_name: string
    Asfi_Files?: Asfi_FilesUncheckedCreateNestedOneWithoutAsfi_requestInput
  }

  export type Asfi_RequestsUpdateInput = {
    authority_position?: StringFieldUpdateOperationsInput | string
    requesting_authority?: StringFieldUpdateOperationsInput | string
    request_code?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    process_type?: EnumProccesTypeFieldUpdateOperationsInput | $Enums.ProccesType
    quantity_detail?: IntFieldUpdateOperationsInput | number
    sent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_name?: StringFieldUpdateOperationsInput | string
    Asfi_Files?: Asfi_FilesUpdateOneWithoutAsfi_requestNestedInput
  }

  export type Asfi_RequestsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    authority_position?: StringFieldUpdateOperationsInput | string
    requesting_authority?: StringFieldUpdateOperationsInput | string
    request_code?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    process_type?: EnumProccesTypeFieldUpdateOperationsInput | $Enums.ProccesType
    quantity_detail?: IntFieldUpdateOperationsInput | number
    sent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_name?: StringFieldUpdateOperationsInput | string
    Asfi_Files?: Asfi_FilesUncheckedUpdateOneWithoutAsfi_requestNestedInput
  }

  export type Asfi_RequestsCreateManyInput = {
    id?: number
    authority_position: string
    requesting_authority: string
    request_code: string
    department: string
    process_type: $Enums.ProccesType
    quantity_detail: number
    sent_date: Date | string
    user_name: string
  }

  export type Asfi_RequestsUpdateManyMutationInput = {
    authority_position?: StringFieldUpdateOperationsInput | string
    requesting_authority?: StringFieldUpdateOperationsInput | string
    request_code?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    process_type?: EnumProccesTypeFieldUpdateOperationsInput | $Enums.ProccesType
    quantity_detail?: IntFieldUpdateOperationsInput | number
    sent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_name?: StringFieldUpdateOperationsInput | string
  }

  export type Asfi_RequestsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    authority_position?: StringFieldUpdateOperationsInput | string
    requesting_authority?: StringFieldUpdateOperationsInput | string
    request_code?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    process_type?: EnumProccesTypeFieldUpdateOperationsInput | $Enums.ProccesType
    quantity_detail?: IntFieldUpdateOperationsInput | number
    sent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_name?: StringFieldUpdateOperationsInput | string
  }

  export type Asfi_FilesCreateInput = {
    file_name: string
    file_url: string
    asfi_request: Asfi_RequestsCreateNestedOneWithoutAsfi_FilesInput
  }

  export type Asfi_FilesUncheckedCreateInput = {
    id?: number
    file_name: string
    file_url: string
    asfi_request_id: number
  }

  export type Asfi_FilesUpdateInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    asfi_request?: Asfi_RequestsUpdateOneRequiredWithoutAsfi_FilesNestedInput
  }

  export type Asfi_FilesUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    asfi_request_id?: IntFieldUpdateOperationsInput | number
  }

  export type Asfi_FilesCreateManyInput = {
    id?: number
    file_name: string
    file_url: string
    asfi_request_id: number
  }

  export type Asfi_FilesUpdateManyMutationInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
  }

  export type Asfi_FilesUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
    asfi_request_id?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumProccesTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProccesType | EnumProccesTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProccesType[] | ListEnumProccesTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProccesType[] | ListEnumProccesTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProccesTypeFilter<$PrismaModel> | $Enums.ProccesType
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Asfi_FilesNullableScalarRelationFilter = {
    is?: Asfi_FilesWhereInput | null
    isNot?: Asfi_FilesWhereInput | null
  }

  export type Asfi_RequestsCountOrderByAggregateInput = {
    id?: SortOrder
    authority_position?: SortOrder
    requesting_authority?: SortOrder
    request_code?: SortOrder
    department?: SortOrder
    process_type?: SortOrder
    quantity_detail?: SortOrder
    sent_date?: SortOrder
    user_name?: SortOrder
  }

  export type Asfi_RequestsAvgOrderByAggregateInput = {
    id?: SortOrder
    quantity_detail?: SortOrder
  }

  export type Asfi_RequestsMaxOrderByAggregateInput = {
    id?: SortOrder
    authority_position?: SortOrder
    requesting_authority?: SortOrder
    request_code?: SortOrder
    department?: SortOrder
    process_type?: SortOrder
    quantity_detail?: SortOrder
    sent_date?: SortOrder
    user_name?: SortOrder
  }

  export type Asfi_RequestsMinOrderByAggregateInput = {
    id?: SortOrder
    authority_position?: SortOrder
    requesting_authority?: SortOrder
    request_code?: SortOrder
    department?: SortOrder
    process_type?: SortOrder
    quantity_detail?: SortOrder
    sent_date?: SortOrder
    user_name?: SortOrder
  }

  export type Asfi_RequestsSumOrderByAggregateInput = {
    id?: SortOrder
    quantity_detail?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumProccesTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProccesType | EnumProccesTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProccesType[] | ListEnumProccesTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProccesType[] | ListEnumProccesTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProccesTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProccesType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProccesTypeFilter<$PrismaModel>
    _max?: NestedEnumProccesTypeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Asfi_RequestsScalarRelationFilter = {
    is?: Asfi_RequestsWhereInput
    isNot?: Asfi_RequestsWhereInput
  }

  export type Asfi_FilesCountOrderByAggregateInput = {
    id?: SortOrder
    file_name?: SortOrder
    file_url?: SortOrder
    asfi_request_id?: SortOrder
  }

  export type Asfi_FilesAvgOrderByAggregateInput = {
    id?: SortOrder
    asfi_request_id?: SortOrder
  }

  export type Asfi_FilesMaxOrderByAggregateInput = {
    id?: SortOrder
    file_name?: SortOrder
    file_url?: SortOrder
    asfi_request_id?: SortOrder
  }

  export type Asfi_FilesMinOrderByAggregateInput = {
    id?: SortOrder
    file_name?: SortOrder
    file_url?: SortOrder
    asfi_request_id?: SortOrder
  }

  export type Asfi_FilesSumOrderByAggregateInput = {
    id?: SortOrder
    asfi_request_id?: SortOrder
  }

  export type Asfi_FilesCreateNestedOneWithoutAsfi_requestInput = {
    create?: XOR<Asfi_FilesCreateWithoutAsfi_requestInput, Asfi_FilesUncheckedCreateWithoutAsfi_requestInput>
    connectOrCreate?: Asfi_FilesCreateOrConnectWithoutAsfi_requestInput
    connect?: Asfi_FilesWhereUniqueInput
  }

  export type Asfi_FilesUncheckedCreateNestedOneWithoutAsfi_requestInput = {
    create?: XOR<Asfi_FilesCreateWithoutAsfi_requestInput, Asfi_FilesUncheckedCreateWithoutAsfi_requestInput>
    connectOrCreate?: Asfi_FilesCreateOrConnectWithoutAsfi_requestInput
    connect?: Asfi_FilesWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumProccesTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProccesType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type Asfi_FilesUpdateOneWithoutAsfi_requestNestedInput = {
    create?: XOR<Asfi_FilesCreateWithoutAsfi_requestInput, Asfi_FilesUncheckedCreateWithoutAsfi_requestInput>
    connectOrCreate?: Asfi_FilesCreateOrConnectWithoutAsfi_requestInput
    upsert?: Asfi_FilesUpsertWithoutAsfi_requestInput
    disconnect?: Asfi_FilesWhereInput | boolean
    delete?: Asfi_FilesWhereInput | boolean
    connect?: Asfi_FilesWhereUniqueInput
    update?: XOR<XOR<Asfi_FilesUpdateToOneWithWhereWithoutAsfi_requestInput, Asfi_FilesUpdateWithoutAsfi_requestInput>, Asfi_FilesUncheckedUpdateWithoutAsfi_requestInput>
  }

  export type Asfi_FilesUncheckedUpdateOneWithoutAsfi_requestNestedInput = {
    create?: XOR<Asfi_FilesCreateWithoutAsfi_requestInput, Asfi_FilesUncheckedCreateWithoutAsfi_requestInput>
    connectOrCreate?: Asfi_FilesCreateOrConnectWithoutAsfi_requestInput
    upsert?: Asfi_FilesUpsertWithoutAsfi_requestInput
    disconnect?: Asfi_FilesWhereInput | boolean
    delete?: Asfi_FilesWhereInput | boolean
    connect?: Asfi_FilesWhereUniqueInput
    update?: XOR<XOR<Asfi_FilesUpdateToOneWithWhereWithoutAsfi_requestInput, Asfi_FilesUpdateWithoutAsfi_requestInput>, Asfi_FilesUncheckedUpdateWithoutAsfi_requestInput>
  }

  export type Asfi_RequestsCreateNestedOneWithoutAsfi_FilesInput = {
    create?: XOR<Asfi_RequestsCreateWithoutAsfi_FilesInput, Asfi_RequestsUncheckedCreateWithoutAsfi_FilesInput>
    connectOrCreate?: Asfi_RequestsCreateOrConnectWithoutAsfi_FilesInput
    connect?: Asfi_RequestsWhereUniqueInput
  }

  export type Asfi_RequestsUpdateOneRequiredWithoutAsfi_FilesNestedInput = {
    create?: XOR<Asfi_RequestsCreateWithoutAsfi_FilesInput, Asfi_RequestsUncheckedCreateWithoutAsfi_FilesInput>
    connectOrCreate?: Asfi_RequestsCreateOrConnectWithoutAsfi_FilesInput
    upsert?: Asfi_RequestsUpsertWithoutAsfi_FilesInput
    connect?: Asfi_RequestsWhereUniqueInput
    update?: XOR<XOR<Asfi_RequestsUpdateToOneWithWhereWithoutAsfi_FilesInput, Asfi_RequestsUpdateWithoutAsfi_FilesInput>, Asfi_RequestsUncheckedUpdateWithoutAsfi_FilesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumProccesTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProccesType | EnumProccesTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProccesType[] | ListEnumProccesTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProccesType[] | ListEnumProccesTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProccesTypeFilter<$PrismaModel> | $Enums.ProccesType
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumProccesTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProccesType | EnumProccesTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProccesType[] | ListEnumProccesTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProccesType[] | ListEnumProccesTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProccesTypeWithAggregatesFilter<$PrismaModel> | $Enums.ProccesType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProccesTypeFilter<$PrismaModel>
    _max?: NestedEnumProccesTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Asfi_FilesCreateWithoutAsfi_requestInput = {
    file_name: string
    file_url: string
  }

  export type Asfi_FilesUncheckedCreateWithoutAsfi_requestInput = {
    id?: number
    file_name: string
    file_url: string
  }

  export type Asfi_FilesCreateOrConnectWithoutAsfi_requestInput = {
    where: Asfi_FilesWhereUniqueInput
    create: XOR<Asfi_FilesCreateWithoutAsfi_requestInput, Asfi_FilesUncheckedCreateWithoutAsfi_requestInput>
  }

  export type Asfi_FilesUpsertWithoutAsfi_requestInput = {
    update: XOR<Asfi_FilesUpdateWithoutAsfi_requestInput, Asfi_FilesUncheckedUpdateWithoutAsfi_requestInput>
    create: XOR<Asfi_FilesCreateWithoutAsfi_requestInput, Asfi_FilesUncheckedCreateWithoutAsfi_requestInput>
    where?: Asfi_FilesWhereInput
  }

  export type Asfi_FilesUpdateToOneWithWhereWithoutAsfi_requestInput = {
    where?: Asfi_FilesWhereInput
    data: XOR<Asfi_FilesUpdateWithoutAsfi_requestInput, Asfi_FilesUncheckedUpdateWithoutAsfi_requestInput>
  }

  export type Asfi_FilesUpdateWithoutAsfi_requestInput = {
    file_name?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
  }

  export type Asfi_FilesUncheckedUpdateWithoutAsfi_requestInput = {
    id?: IntFieldUpdateOperationsInput | number
    file_name?: StringFieldUpdateOperationsInput | string
    file_url?: StringFieldUpdateOperationsInput | string
  }

  export type Asfi_RequestsCreateWithoutAsfi_FilesInput = {
    authority_position: string
    requesting_authority: string
    request_code: string
    department: string
    process_type: $Enums.ProccesType
    quantity_detail: number
    sent_date: Date | string
    user_name: string
  }

  export type Asfi_RequestsUncheckedCreateWithoutAsfi_FilesInput = {
    id?: number
    authority_position: string
    requesting_authority: string
    request_code: string
    department: string
    process_type: $Enums.ProccesType
    quantity_detail: number
    sent_date: Date | string
    user_name: string
  }

  export type Asfi_RequestsCreateOrConnectWithoutAsfi_FilesInput = {
    where: Asfi_RequestsWhereUniqueInput
    create: XOR<Asfi_RequestsCreateWithoutAsfi_FilesInput, Asfi_RequestsUncheckedCreateWithoutAsfi_FilesInput>
  }

  export type Asfi_RequestsUpsertWithoutAsfi_FilesInput = {
    update: XOR<Asfi_RequestsUpdateWithoutAsfi_FilesInput, Asfi_RequestsUncheckedUpdateWithoutAsfi_FilesInput>
    create: XOR<Asfi_RequestsCreateWithoutAsfi_FilesInput, Asfi_RequestsUncheckedCreateWithoutAsfi_FilesInput>
    where?: Asfi_RequestsWhereInput
  }

  export type Asfi_RequestsUpdateToOneWithWhereWithoutAsfi_FilesInput = {
    where?: Asfi_RequestsWhereInput
    data: XOR<Asfi_RequestsUpdateWithoutAsfi_FilesInput, Asfi_RequestsUncheckedUpdateWithoutAsfi_FilesInput>
  }

  export type Asfi_RequestsUpdateWithoutAsfi_FilesInput = {
    authority_position?: StringFieldUpdateOperationsInput | string
    requesting_authority?: StringFieldUpdateOperationsInput | string
    request_code?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    process_type?: EnumProccesTypeFieldUpdateOperationsInput | $Enums.ProccesType
    quantity_detail?: IntFieldUpdateOperationsInput | number
    sent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_name?: StringFieldUpdateOperationsInput | string
  }

  export type Asfi_RequestsUncheckedUpdateWithoutAsfi_FilesInput = {
    id?: IntFieldUpdateOperationsInput | number
    authority_position?: StringFieldUpdateOperationsInput | string
    requesting_authority?: StringFieldUpdateOperationsInput | string
    request_code?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    process_type?: EnumProccesTypeFieldUpdateOperationsInput | $Enums.ProccesType
    quantity_detail?: IntFieldUpdateOperationsInput | number
    sent_date?: DateTimeFieldUpdateOperationsInput | Date | string
    user_name?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}