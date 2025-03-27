import { MdError } from "react-icons/md";

const ErrorPage: React.FC = () => {
  return (
    <div className="h-[80vh] w-[95vw] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-3">
        <MdError size={64} color="#1e3a8a" />
        <p className="text-blue-900 capitalize font-light italic text-center">
          Une erreur est survenue. Veuillez réessayer plus tard <br />ou contacter le
          support si le problème persiste!
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
