import banner from '../../../assets/banner.jpg'

const Banner = () => {
  return (
    <div
      className="hero min-h-[600px]"
      style={{
        backgroundImage:`url(${banner})`
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-[600px]">
          <h1 className="mb-5 text-5xl font-bold">Satisfaction Survey</h1>
          <p className="mb-5">
          Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas concludaturque usu, facete detracto patrioque an per, lucilius pertinacia eu vel. Adhuc invidunt duo ex. Eu tantas dolorum ullamcorper qui.
          </p>
          <button className="btn btn-primary">Start Survey</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
