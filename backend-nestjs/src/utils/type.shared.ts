import { UserEntity } from '../modules/user/entities/user.entity';

export interface NestJSRequest {
  _readableState: ReadableState;
  readable: boolean;
  _events: Events;
  _eventsCount: number;
  socket: Socket;
  httpVersionMajor: number;
  httpVersionMinor: number;
  httpVersion: string;
  complete: boolean;
  headers: WelcomeHeaders;
  rawHeaders: string[];
  trailers: Events;
  rawTrailers: any[];
  aborted: boolean;
  upgrade: boolean;
  url: string;
  method: string;
  statusCode: null;
  statusMessage: null;
  _consuming: boolean;
  _dumped: boolean;
  baseUrl: string;
  originalUrl: string;
  _parsedUrl: ParsedURL;
  params: NestJSParams;
  query: Events;
  res: Res;
  body: Events;
  timedout: boolean;
  apicacheTimer: Date;
  rateLimit: RateLimit;
  route: Route;
  user: UserEntity;
}

export interface Events {

}

export interface ParsedURL {
  protocol: null;
  slashes: null;
  auth: null;
  host: null;
  port: null;
  hostname: null;
  hash: null;
  search: null;
  query: null;
  pathname: string;
  path: string;
  href: string;
  _raw: string;
}

export interface ReadableState {
  objectMode: boolean;
  highWaterMark: number;
  buffer: Buffer;
  length: number;
  pipes: null;
  pipesCount: number;
  flowing: boolean;
  ended: boolean;
  endEmitted: boolean;
  reading: boolean;
  sync: boolean;
  needReadable: boolean;
  emittedReadable: boolean;
  readableListening: boolean;
  resumeScheduled: boolean;
  paused: boolean;
  emitClose: boolean;
  autoDestroy: boolean;
  destroyed: boolean;
  defaultEncoding: string;
  awaitDrain: number;
  readingMore: boolean;
  decoder: null;
  encoding: null;
}

export interface Buffer {
  head: null;
  tail: null;
  length: number;
}

export interface WelcomeHeaders {
  host: string;
  'accept-encoding': string;
  'sec-fetch-mode': string;
  origin: string;
  authorization: string;
  accept: string;
  referer: string;
  'user-agent': string;
  dnt: string;
}

export interface NestJSParams {
  [key: string]: any;
}

export interface RateLimit {
  limit: number;
  current: number;
  remaining: number;
  resetTime: Date;
}

export interface Res {
  _events: Events;
  _eventsCount: number;
  output: any[];
  outputEncodings: any[];
  outputCallbacks: any[];
  outputSize: number;
  writable: boolean;
  _last: boolean;
  chunkedEncoding: boolean;
  shouldKeepAlive: boolean;
  useChunkedEncodingByDefault: boolean;
  sendDate: boolean;
  _removedConnection: boolean;
  _removedContLen: boolean;
  _removedTE: boolean;
  _contentLength: number;
  _hasBody: boolean;
  _trailer: string;
  finished: boolean;
  _headerSent: boolean;
  socket: null;
  connection: null;
  _header: string;
  _sent100: boolean;
  _expect_continue: boolean;
  locals: Events;
  __onFinished: null;
  _apicache: Apicache;
  statusCode: number;
  statusMessage: string;
}

export interface Apicache {
  cacheable: boolean;
  headers: ApicacheHeaders;
}

export interface ApicacheHeaders {
  'x-dns-prefetch-control': string;
  'x-frame-options': string;
  'strict-transport-security': string;
  'x-download-options': string;
  'x-content-type-options': string;
  'x-xss-protection': string;
  'access-control-allow-origin': string;
  'cache-control': string;
  'x-ratelimit-limit': number;
  'x-ratelimit-remaining': number;
  date: string;
  'x-ratelimit-reset': number;
  'content-type': string;
  'content-length': string;
  etag: string;
}

export interface Route {
  path: string;
  stack: Stack[];
  methods: Methods;
}

export interface Methods {
  get: boolean;
}

export interface Stack {
  name: string;
  keys: any[];
  regexp: Regexp;
  method: string;
}

export interface Regexp {
  fast_star: boolean;
  fast_slash: boolean;
}

export interface Socket {
  connecting: boolean;
  _hadError: boolean;
  _handle: null;
  _parent: null;
  _host: null;
  _readableState: ReadableState;
  readable: boolean;
  _events: SocketEvents;
  _eventsCount: number;
  _writableState: WritableState;
  writable: boolean;
  allowHalfOpen: boolean;
  _sockname: null;
  _pendingData: null;
  _pendingEncoding: string;
  server: Server;
  timeout: number;
  parser: null;
  _paused: boolean;
  _httpMessage: null;
  _peername: Peername;
}

export interface SocketEvents {
  end: null[];
  drain: null[];
}

export interface Peername {
  address: string;
  family: string;
  port: number;
}

export interface WritableState {
  objectMode: boolean;
  highWaterMark: number;
  finalCalled: boolean;
  needDrain: boolean;
  ending: boolean;
  ended: boolean;
  finished: boolean;
  destroyed: boolean;
  decodeStrings: boolean;
  defaultEncoding: string;
  length: number;
  writing: boolean;
  corked: number;
  sync: boolean;
  bufferProcessing: boolean;
  writecb: null;
  writelen: number;
  bufferedRequest: null;
  lastBufferedRequest: null;
  pendingcb: number;
  prefinished: boolean;
  errorEmitted: boolean;
  emitClose: boolean;
  autoDestroy: boolean;
  bufferedRequestCount: number;
  corkedRequestsFree: CorkedRequestsFree;
}

export interface CorkedRequestsFree {
  next: CorkedRequestsFree | null;
  entry: null;
}

export interface Server {
  _events: Events;
  _eventsCount: number;
  _connections: number;
  _handle: Handle;
  _usingWorkers: boolean;
  _workers: any[];
  _unref: boolean;
  allowHalfOpen: boolean;
  pauseOnConnect: boolean;
  httpAllowHalfOpen: boolean;
  timeout: number;
  keepAliveTimeout: number;
  maxHeadersCount: null;
  headersTimeout: number;
  _connectionKey: string;
}

export interface Handle {
  reading: boolean;
  onread: null;
}
