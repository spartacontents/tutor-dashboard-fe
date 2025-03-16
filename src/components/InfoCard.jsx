export default function InfoCard ({title, content}) {
    return (
        <div className="info-card">
          <h3 className="info-card-title">{title}</h3>
          <p className="info-card-content">{content}</p>
        </div>
      );
    }
