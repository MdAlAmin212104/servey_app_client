import useAuth from "../../../hook/useAuth";


const ProUserHome = () => {
    const {user } = useAuth();

    return (
        <div>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">Hi, {user.displayName}</h1>
        </div>
    );
};

export default ProUserHome;