const Footer = () => {
  return (
    <footer className="w-full pb-10 pt-8 mt-20 bg-surface border-t border-border-strong">
      <div className="flex flex-col gap-lg justify-between max-w-250 mx-auto px-container-margin">
        <h2 className="text-headline-lg font-display font-bold text-accent-primary-hover">
          Devscape
        </h2>
        <p className="font-body-sm text-body-sm text-on-cool-blue dark:text-on-deep-space-blue">
          &#xA9; 2026 Ni Nyoman Devina Arista
        </p>
      </div>
    </footer>
  );
};

export default Footer;
