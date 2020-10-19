/** server and browser code */

export enum FileOpcode //{
{
    CHMOD          = "chmod",
    COPY           = "copy",
    COPYR          = "copyr",
    EXECUTE        = "execute",
    GETDIR         = "getdir",
    INVALID        = "invalid",
    MKDIR          = "mkdir",
    MOVE           = "move",
    READ           = "read",
    REMOVE         = "remove",
    RENAME         = "rename",
    STAT           = "stat",
    TOUCH          = "touch",
    TRUNCATE       = "truncate",
    WRITE          = "write",
    UPLOAD         = "upload",
    UPLOAD_WRITE   = "upload_write",
    UPLOAD_WRITE_B = "upload_write_b",
    UPLOAD_MERGE   = "upload_merge",
    NEW_FOLDER     = "new_folder",
    NEW_FILE       = "new_file"
} //}

export enum FileEvent //{
{
    REMOVE   = "remove",
    MOVE     = "move",
    MODIFIED = "modified",
    CHMOD    = "chmod",
    CHOWN    = "chown",
    NEW      = "new",
    INVALID  = "invalid"
} //}

export enum ECode //{ 
{
    NOERR           = 0,
    EPERM           = 1,
    ENOENT          = 2,
    ESRCH           = 3,
    EINTR           = 4,
    EIO             = 5,
    ENXIO           = 6,
    E2BIG           = 7,
    ENOEXEC         = 8,
    EBADF           = 9,
    ECHILD          = 10,
    EAGAIN          = 11,
    ENOMEM          = 12,
    EACCES          = 13,
    EFAULT          = 14,
    ENOTBLK         = 15,
    EBUSY           = 16,
    EEXIST          = 17,
    EXDEV           = 18,
    ENODEV          = 19,
    ENOTDIR         = 20,
    EISDIR          = 21,
    EINVAL          = 22,
    ENFILE          = 23,
    EMFILE          = 24,
    ENOTTY          = 25,
    ETXTBSY         = 26,
    EFBIG           = 27,
    ENOSPC          = 28,
    ESPIPE          = 29,
    EROFS           = 30,
    EMLINK          = 31,
    EPIPE           = 32,
    EDOM            = 33,
    ERANGE          = 34,
    EDEADLK         = 35,
    ENAMETOOLONG    = 36,
    ENOLCK          = 37,
    ENOSYS          = 38,
    ENOTEMPTY       = 39,
    ELOOP           = 40,
    ENOMSG          = 42,
    EIDRM           = 43,
    ECHRNG          = 44,
    EL2NSYNC        = 45,
    EL3HLT          = 46,
    EL3RST          = 47,
    ELNRNG          = 48,
    EUNATCH         = 49,
    ENOCSI          = 50,
    EL2HLT          = 51,
    EBADE           = 52,
    EBADR           = 53,
    EXFULL          = 54,
    ENOANO          = 55,
    EBADRQC         = 56,
    EBADSLT         = 57,
    EBFONT          = 59,
    ENOSTR          = 60,
    ENODATA         = 61,
    ETIME           = 62,
    ENOSR           = 63,
    ENONET          = 64,
    ENOPKG          = 65,
    EREMOTE         = 66,
    ENOLINK         = 67,
    EADV            = 68,
    ESRMNT          = 69,
    ECOMM           = 70,
    EPROTO          = 71,
    EMULTIHOP       = 72,
    EDOTDOT         = 73,
    EBADMSG         = 74,
    EOVERFLOW       = 75,
    ENOTUNIQ        = 76,
    EBADFD          = 77,
    EREMCHG         = 78,
    ELIBACC         = 79,
    ELIBBAD         = 80,
    ELIBSCN         = 81,
    ELIBMAX         = 82,
    ELIBEXEC        = 83,
    EILSEQ          = 84,
    ERESTART        = 85,
    ESTRPIPE        = 86,
    EUSERS          = 87,
    ENOTSOCK        = 88,
    EDESTADDRREQ    = 89,
    EMSGSIZE        = 90,
    EPROTOTYPE      = 91,
    ENOPROTOOPT     = 92,
    EPROTONOSUPPORT = 93,
    ESOCKTNOSUPPORT = 94,
    EOPNOTSUPP      = 95,
    EPFNOSUPPORT    = 96,
    EAFNOSUPPORT    = 97,
    EADDRINUSE      = 98,
    EADDRNOTAVAIL   = 99,
    ENETDOWN        = 100,
    ENETUNREACH     = 101,
    ENETRESET       = 102,
    ECONNABORTED    = 103,
    ECONNRESET      = 104,
    ENOBUFS         = 105,
    EISCONN         = 106,
    ENOTCONN        = 107,
    ESHUTDOWN       = 108,
    ETOOMANYREFS    = 109,
    ETIMEDOUT       = 110,
    ECONNREFUSED    = 111,
    EHOSTDOWN       = 112,
    EHOSTUNREACH    = 113,
    EALREADY        = 114,
    EINPROGRESS     = 115,
    ESTALE          = 116,
    EUCLEAN         = 117,
    ENOTNAM         = 118,
    ENAVAIL         = 119,
    EISNAM          = 120,
    EREMOTEIO       = 121,
    EDQUOT          = 122,
    ENOMEDIUM       = 123,
    EMEDIUMTYPE     = 124,
    ECANCELED       = 125,
    ENOKEY          = 126,
    EKEYEXPIRED     = 127,
    EKEYREVOKED     = 128,
    EKEYREJECTED    = 129,
    EOWNERDEAD      = 130,
    ENOTRECOVERABLE = 131,
} //}
// ECodeString //{
let ECodeString = [
    "success",
    "Operation not permitted",
    "No such file or directory",
    "No such process",
    "Interrupted system call",
    "I/O error",
    "No such device or address",
    "Argument list too long",
    "Exec format error",
    "Bad file number",
    "No child processes",
    "Try again",
    "Out of memory",
    "Permission denied",
    "Bad address",
    "Block device required",
    "Device or resource busy",
    "File exists",
    "Cross-device link",
    "No such device",
    "Not a directory",
    "Is a directory",
    "Invalid argument",
    "File table overflow",
    "Too many open files",
    "Not a typewriter",
    "Text file busy",
    "File too large",
    "No space left on device",
    "Illegal seek",
    "Read-only file system",
    "Too many links",
    "Broken pipe",
    "Math argument out of domain of func",
    "Math result not representable",
    "Resource deadlock would occur",
    "File name too long",
    "No record locks available",
    "Function not implemented",
    "Directory not empty",
    "Too many symbolic links encountered",
    "No message of desired type",
    "Identifier removed",
    "Channel number out of range",
    "Level 2 not synchronized",
    "Level 3 halted",
    "Level 3 reset",
    "Link number out of range",
    "Protocol driver not attached",
    "No CSI structure available",
    "Level 2 halted",
    "Invalid exchange",
    "Invalid request descriptor",
    "Exchange full",
    "No anode",
    "Invalid request code",
    "Invalid slot",
    "Bad font file format",
    "Device not a stream",
    "No data available",
    "Timer expired",
    "Out of streams resources",
    "Machine is not on the network",
    "Package not installed",
    "Object is remote",
    "Link has been severed",
    "Advertise error",
    "Srmount error",
    "Communication error on send",
    "Protocol error",
    "Multihop attempted",
    "RFS specific error",
    "Not a data message",
    "Value too large for defined data type",
    "Name not unique on network",
    "File descriptor in bad state",
    "Remote address changed",
    "Can not access a needed shared library",
    "Accessing a corrupted shared library",
    ".lib section in a.out corrupted",
    "Attempting to link in too many shared libraries",
    "Cannot exec a shared library directly",
    "Illegal byte sequence",
    "Interrupted system call should be restarted",
    "Streams pipe error",
    "Too many users",
    "Socket operation on non-socket",
    "Destination address required",
    "Message too long",
    "Protocol wrong type for socket",
    "Protocol not available",
    "Protocol not supported",
    "Socket type not supported",
    "Operation not supported on transport endpoint",
    "Protocol family not supported",
    "Address family not supported by protocol",
    "Address already in use",
    "Cannot assign requested address",
    "Network is down",
    "Network is unreachable",
    "Network dropped connection because of reset",
    "Software caused connection abort",
    "Connection reset by peer",
    "No buffer space available",
    "Transport endpoint is already connected",
    "Transport endpoint is not connected",
    "Cannot send after transport endpoint shutdown",
    "Too many references: cannot splice",
    "Connection timed out",
    "Connection refused",
    "Host is down",
    "No route to host",
    "Operation already in progress",
    "Operation now in progress",
    "Stale NFS file handle",
    "Structure needs cleaning",
    "Not a XENIX named type file",
    "No XENIX semaphores available",
    "Is a named type file",
    "Remote I/O error",
    "Quota exceeded",
    "No medium found",
    "Wrong medium type",
    "Operation Canceled",
    "Required key not available",
    "Key has expired",
    "Key has been revoked",
    "Key was rejected by service",
    "Owner died",
    "State not recoverable"
] //}

export function ECode2String(sc: ECode): string {return ECodeString[sc] || "Unkonw error";}

