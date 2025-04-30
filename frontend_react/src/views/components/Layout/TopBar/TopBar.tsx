import "./TopBar.css";

export const TopBar = () => {
    return (
        <div className="d-flex flex-row topbar">
            <div className="d-flex flex-row align-items-center left-nav gap-2">
                <img src="/images/avatar.svg" className="avatar" />
                <h6>Julien Veniz</h6>
            </div>
            <div className="d-flex flex-row align-items-center ms-auto right-nav gap-2">
                <img src="/icons/bell.svg" alt="Icon 1" className="icon" />
                <img src="/icons/settings-1.svg" alt="Icon 2" className="icon" />
            </div>
        </div>
    );
};