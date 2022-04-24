export const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;

export const escaped: Record<string, string> = {
	'<': '\\u003C',
	'>': '\\u003E',
	'/': '\\u002F',
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t',
	'\0': '\\0',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029',
};

export function escapeUnsafeChar(c: string) {
	return escaped[c] || c;
}

export function escapeUnsafeChars(str: string) {
	return str.replace(unsafeChars, escapeUnsafeChar);
}

export default function SafeStringify(obj: unknown) {
	return escapeUnsafeChars(JSON.stringify(obj));
}
