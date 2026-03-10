import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, subtitle, backTo, onAdd }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        // Prefer true back navigation; fallback keeps direct-open routes usable.
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }
        navigate(backTo || "/", { replace: true });
    };

    return (
        <div className="page-header">
            <div className="page-header__left">
                {backTo && (
                    <button type="button" className="page-header__back" onClick={handleBack} aria-label="Go back">
                        ←
                    </button>
                )}
                <div>
                    {subtitle && <span className="page-header__subtitle">{subtitle}</span>}
                    <h1 className="page-header__title">{title}</h1>
                </div>
            </div>
            {onAdd && (
                <button className="btn btn--primary btn--sm" onClick={onAdd}>
                    + Add
                </button>
            )}
        </div>
    );
};

export default PageHeader;
