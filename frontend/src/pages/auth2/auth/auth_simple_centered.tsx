import Auth from './partials/auth';

const AuthSimpleCentered: React.FC = () => {
  return (
    <div className="container py-base-4xl">
      <div className="row items-start justify-center">
        <div className="col-12 md:col-7 lg:col-6 xl:col-5 2xl:col-4">
          <Auth />
        </div>
      </div>
    </div>
  );
};

export default AuthSimpleCentered;
