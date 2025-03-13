export default function InfoCard ({title, content}) {
    return (
        <div className="border p-4 ruonded md shadow-md">
            <h3 className="text-lg font-bold mb-2 bg-gray-800 text-white p-2 rounded">
                {title}
            </h3>
            <p>{content}</p>
        </div>
    );
}
