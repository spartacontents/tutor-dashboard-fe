export default function ContractTable({contracts = [] }) {
    return (
        <div className="contract-section">
          <table className="contract-table">
            <thead>
              <tr>
                <th>활동(계약)</th>
                <th>시작일자</th>
                <th>종료일자</th>
                <th>협업 팀</th>
                <th>추천도</th>
              </tr>
            </thead>
            <tbody>
              {contracts.length > 0 ? (
                contracts.map((contract, index) => (
                  <tr key={index}>
                    <td>{contract.activity}</td>
                    <td>{contract.startDate}</td>
                    <td>{contract.endDate}</td>
                    <td>{contract.team}</td>
                    <td>⭐ {contract.rating}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-result">
                    계약 정보가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    }