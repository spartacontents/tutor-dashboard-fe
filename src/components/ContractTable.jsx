export default function ContractTable({contracts = [] }) {
    return (
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th className="p-2 border"> 활동 (계약) </th>
                        <th className="p-2 border"> 시작일자 </th>
                        <th className="p-2 border"> 종료일자 </th>
                        <th className="p-2 border"> 협업 팀 </th>
                        <th className="p-2 border"> 추천도 </th>
                    </tr>
                </thead>
                <tbody>
                    {contracts.map ((contract, index) => (
                            <tr key={index}>
                                <td className="p-2 border"> {contract.activity}</td>
                                <td className="p-2 border"> {contract.startDate}</td>
                                <td className="p-2 border"> {contract.endDate}</td>
                                <td className="p-2 border"> {contract.team}</td>
                                <td className="p-2 border"> {contract.recommendation}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
    );
}