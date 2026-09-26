import { socialLinks } from "../constants";

export const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-5 border-t border-black-300 c-space pt-7 pb-3">
      <div className="text-white-500">
        &copy; {new Date().getFullYear()} <strong>Tanh Tran</strong>. All rights
        reserved.
      </div>

      <div className="flex gap-3">
        {socialLinks.map(({ icon, name, url }) => (
          <a
            href={url}
            key={url}
            target="_blank"
            rel="noreferrer noopener"
            title={name}
            className="social-icon"
          >
            <img src={icon} alt={name} className="size-1/2" />
          </a>
        ))}
      </div>
    </footer>
  );
};
