interface Props {}

export default function SignUpNoteField(props: Props) {
  return (
    <div className="pt-12">
      <label className="text-sm font-semibold text-gray-900">Any extra comment or notes?</label>

      <textarea
        id="message"
        rows={4}
        className="block mt-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Write your thoughts here... (in BETA version we don't save this data, you don't have to type anything)"
      ></textarea>
    </div>
  )
}
