




export default function Error({ value }: { value: string | undefined } ) {
    return (
        <p className='text-red-500 font-semibold'>{value}</p>
    )
}
