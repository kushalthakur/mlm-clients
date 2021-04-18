const _maxLength = (max: number) => (value: string) => value && value.length > max ? `Must be ${max} characters or less` : undefined
const _minLength = (min: number) => (value: string) => value && value.length < min ? `Must be at least ${min}` : undefined
export class ReduxValidation {
   static required = (value: string) => value && ((typeof value === "string" && value.trim()) || (typeof value !== "string" && true)) ? undefined : "This field is required"
   static email = (value: string) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined
   static number = (value: string) => value && isNaN(Number(value)) ? `Must be a number` : undefined
   static alphaNumeric = (value: string) => value && /[^a-zA-Z0-9 ]/i.test(value) ? `Only alphanumeric characters` : undefined
   static maxLength = _maxLength(10)
   static minLength = _minLength(6)
}