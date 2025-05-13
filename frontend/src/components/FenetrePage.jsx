const FenetrePage = ({ titre, children }) => {
  return (
    <div className="fenetre-retro max-w-4xl mx-auto my-8">
      <div className="fenetre-retro-title">{titre}</div>
      <div className="fenetre-retro-content">{children}</div>
    </div>
  );
};

export default FenetrePage;
