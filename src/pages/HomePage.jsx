import { Link } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';

const MORSE_LINES = [
  '..-. .-. --- --',
  '-- . -.-. .... .- -. .. ... --',
  '- ---',
  '.. -. - . .-. .- -.-. - .. --- -. ... --..--',
  '.- .-.. .-..',
  '.. -.',
  '--- -. .',
  '.--. .-.. .- -.-. .',
];

const DOT_ROW = '. . . . . . . . . . . . . . .';

const HomePage = () => {
  return (
    <section className="w-full min-h-screen h-screen mx-auto px-5 pt-3 flex flex-row justify-evenly">
      <article className="h-full w-full flex flex-col justify-center gap-container-margin md:max-w-3/4">
        <h1 className="text-display text-text-primary text-7xl text-end">Know your <span className="text-accent-primary">medicine</span>, use it right.</h1>
        <div className="flex flex-row justify-end items-center w-full h-auto pt-5">
          <Link
            to={'/references'}
            className="w-auto flex flex-row items-center justify-between gap-1.5 bg-accent-cta text-text-on-cta hover:bg-accent-cta-hover p-2 rounded-xl text-headline-lg text-xl transition-colors duration-300"
          >
            <p>
                Learn more
            </p>
            <FaLocationArrow className='text-text-on-cta/70 text-sm mt-0.5' />
          </Link>
        </div>
      </article>
      <div className="pointer-events-none absolute -top-32 right-0 -z-10 h-84 w-84 rounded-full bg-accent-primary/20 md:bg-accent-primary/6 blur-3xl sm:h-96 sm:w-96 lg:h-128 lg:w-128"></div>
      <div className="pointer-events-none absolute -bottom-70 left-0 -z-10 h-84 w-84 rounded-full bg-accent-primary/15 md:bg-accent-primary/4 blur-3xl sm:h-96 sm:w-96 lg:h-128 lg:w-128"></div>
      <article className="h-full flex-row justify-center items-center text-justify gap-container-margin hidden lg:flex w-1/12 min-w-0">
        <pre className="text-xs whitespace-pre-wrap wrap-break-words overflow-hidden text-text-muted z-[-1]">
          {[
            ...Array(6).fill(DOT_ROW),
            ...MORSE_LINES,
            ...Array(6).fill(DOT_ROW),
          ].join('\n')}
        </pre>
      </article>
    </section>
  );
};

export default HomePage;
