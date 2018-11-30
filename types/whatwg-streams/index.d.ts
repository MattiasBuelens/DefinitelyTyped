// Type definitions for Streams API
// Project: https://github.com/whatwg/streams
// Definitions by: Kagami Sascha Rosylight <https://github.com/saschanaz>
//                 Konstantin Simon Maria Möllers <https://github.com/ksm2>
//                 Mattias Buelens <https://github.com/MattiasBuelens>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

export interface UnderlyingSource<R = any> {
    start?: ReadableStreamDefaultControllerCallback<R>;
    pull?: ReadableStreamDefaultControllerCallback<R>;
    cancel?: ReadableStreamErrorCallback;

    type?: undefined;
}

export interface UnderlyingByteSource {
    start?: ReadableByteStreamControllerCallback;
    pull?: ReadableByteStreamControllerCallback;
    cancel?: ReadableStreamErrorCallback;

    type: "bytes";
    autoAllocateChunkSize?: number;
}

export interface QueuingStrategy<T = any> {
    highWaterMark?: number;
    size?: QueuingStrategySizeCallback<T>;
}

export interface PipeOptions {
    preventClose?: boolean;
    preventAbort?: boolean;
    preventCancel?: boolean;
}

export interface ReadableStreamReadResult<T> {
    done: boolean;
    value: T;
}

export interface ReadableStream<R = any> {
    readonly locked: boolean;

    cancel(reason?: any): Promise<void>;
    getReader(options: { mode: "byob" }): ReadableStreamBYOBReader;
    getReader(): ReadableStreamDefaultReader<R>;
    pipeThrough<T>({writable, readable}: { writable: WritableStream<R>, readable: ReadableStream<T> }, options?: PipeOptions): ReadableStream<T>;
    pipeTo(dest: WritableStream<R>, options?: PipeOptions): Promise<void>;
    tee(): [ReadableStream<R>, ReadableStream<R>];
}

export declare var ReadableStream: {
    prototype: ReadableStream;
    new(underlyingSource: UnderlyingByteSource, strategy?: { highWaterMark?: number, size?: undefined }): ReadableStream<Uint8Array>;
    new<R = any>(underlyingSource?: UnderlyingSource<R>, strategy?: QueuingStrategy<R>): ReadableStream<R>;
};

export interface ReadableStreamDefaultReader<R = any> {
    readonly closed: Promise<void>;

    cancel(reason?: any): Promise<void>;
    read(): Promise<ReadableStreamReadResult<R>>;
    releaseLock(): void;
}

export interface ReadableStreamBYOBReader {
    readonly closed: Promise<void>;

    cancel(reason?: any): Promise<void>;
    read<T extends ArrayBufferView>(view: T): Promise<ReadableStreamReadResult<T>>;
    releaseLock(): void;
}

export interface ReadableStreamDefaultController<R = any> {
    readonly desiredSize: number | null;

    close(): void;
    enqueue(chunk: R): void;
    error(error?: any): void;
}

export interface ReadableByteStreamController {
    readonly byobRequest: ReadableStreamBYOBRequest | undefined;
    readonly desiredSize: number | null;

    close(): void;
    enqueue(chunk: ArrayBufferView): void;
    error(error?: any): void;
}

export interface ReadableStreamBYOBRequest {
    readonly view: ArrayBufferView;

    respond(bytesWritten: number): void;
    respondWithNewView(view: ArrayBufferView): void;
}

export interface UnderlyingSink<W = any> {
    start?: WritableStreamDefaultControllerStartCallback;
    write?: WritableStreamDefaultControllerWriteCallback<W>;
    close?: WritableStreamDefaultControllerCloseCallback;
    abort?: WritableStreamErrorCallback;

    type?: undefined;
}

export interface WritableStream<W = any> {
    readonly locked: boolean;

    abort(reason?: any): Promise<void>;
    getWriter(): WritableStreamDefaultWriter<W>;
}

export declare var WritableStream: {
    prototype: WritableStream;
    new<W = any>(underlyingSink?: UnderlyingSink<W>, strategy?: QueuingStrategy<W>): WritableStream<W>;
};

export interface WritableStreamDefaultWriter<W = any> {
    readonly closed: Promise<void>;
    readonly desiredSize: number | null;
    readonly ready: Promise<void>;

    abort(reason?: any): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk: W): Promise<void>;
}

export interface WritableStreamDefaultController {
    error(error?: any): void;
}

export interface ByteLengthQueuingStrategy extends QueuingStrategy<ArrayBufferView> {
    highWaterMark: number;
    size(chunk: ArrayBufferView): number;
}

export declare var ByteLengthQueuingStrategy: {
    prototype: ByteLengthQueuingStrategy;
    new(options: { highWaterMark: number }): ByteLengthQueuingStrategy;
};

export interface CountQueuingStrategy extends QueuingStrategy {
    highWaterMark: number;
    size(chunk: any): 1;
}

export declare var CountQueuingStrategy: {
    prototype: CountQueuingStrategy;
    new(options: { highWaterMark: number }): CountQueuingStrategy;
};

export interface Transformer<I = any, O = any> {
    start?: TransformStreamDefaultControllerCallback<O>;
    transform?: TransformStreamDefaultControllerTransformCallback<I, O>;
    flush?: TransformStreamDefaultControllerCallback<O>;

    readableType?: undefined;
    writableType?: undefined;
}

export interface TransformStream<I = any, O = any> {
    readonly readable: ReadableStream<O>;
    readonly writable: WritableStream<I>;
}

export declare var TransformStream: {
    prototype: TransformStream;
    new<I = any, O = any>(transformer?: Transformer<I, O>, writableStrategy?: QueuingStrategy<I>, readableStrategy?: QueuingStrategy<O>): TransformStream<I, O>;
};

export interface TransformStreamDefaultController<O = any> {
    readonly desiredSize: number | null;

    enqueue(chunk: O): void;
    error(reason?: any): void;
    terminate(): void;
}

export interface QueuingStrategySizeCallback<T = any> {
    (chunk: T): number;
}

export interface ReadableByteStreamControllerCallback {
    (controller: ReadableByteStreamController): void | PromiseLike<void>;
}

export interface ReadableStreamDefaultControllerCallback<R> {
    (controller: ReadableStreamDefaultController<R>): void | PromiseLike<void>;
}

export interface ReadableStreamErrorCallback {
    (reason: any): void | PromiseLike<void>;
}

export interface TransformStreamDefaultControllerCallback<O> {
    (controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}

export interface TransformStreamDefaultControllerTransformCallback<I, O> {
    (chunk: I, controller: TransformStreamDefaultController<O>): void | PromiseLike<void>;
}

export interface WritableStreamDefaultControllerCloseCallback {
    (): void | PromiseLike<void>;
}

export interface WritableStreamDefaultControllerStartCallback {
    (controller: WritableStreamDefaultController): void | PromiseLike<void>;
}

export interface WritableStreamDefaultControllerWriteCallback<W> {
    (chunk: W, controller: WritableStreamDefaultController): void | PromiseLike<void>;
}

export interface WritableStreamErrorCallback {
    (reason: any): void | PromiseLike<void>;
}
