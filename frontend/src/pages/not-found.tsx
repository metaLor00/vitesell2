 const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-lg text-gray-500">Page not found</p>
      </div>
    </div>
  );
};      

export default NotFound;