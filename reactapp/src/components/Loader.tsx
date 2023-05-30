import "../styles/components/Loader.css";

function Loader() {
    return (
        <div className="loader">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Loader;
