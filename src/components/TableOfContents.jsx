import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { toTitleCase } from '../utils/utils.js';

const TableOfContents = ({ contents = [] }) => {
  const [activeId, setActiveId] = useState(contents[0] ?? null);

  const [activeTableContents, setActiveTableContents] = useState(true);
  const toggleTableContents = () => {
    setActiveTableContents((prev) => prev === false ? true : false);
  };

  const isScrollingRef = useRef(false);

  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveId(id);
    isScrollingRef.current = true;

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.pushState(null, '', `#${id}`);

    window.addEventListener(
      'scrollend',
      () => { isScrollingRef.current = false; },
      { once: true }
    );
    setTimeout(() => { isScrollingRef.current = false; }, 1000);
  };

  const contentsKey = JSON.stringify(contents);

  const SCROLL_OFFSET = 90;

  useEffect(() => {
    const ids = JSON.parse(contentsKey);
    setActiveId(ids[0] ?? null);

    if (!ids.length) return;

    const visible = new Set();
    let intersectionObserver = null;
    let observedCount = 0;

    const setup = () => {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (!elements.length || elements.length === observedCount) return;

      intersectionObserver?.disconnect();
      visible.clear();
      observedCount = elements.length;

      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.add(entry.target.id);
            else visible.delete(entry.target.id);
          });

          const first = ids.find((id) => visible.has(id));
          if (first && !isScrollingRef.current) setActiveId(first);
        },
        { rootMargin: `-${SCROLL_OFFSET + 1}px 0px -70% 0px`, threshold: 0 }
      );

      elements.forEach((el) => intersectionObserver.observe(el));
    };

    setup();

    const mutationObserver = new MutationObserver(setup);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [contentsKey]);

  return (
    <aside className="fixed left-5 top-1/2 -translate-y-1/3 z-10 w-42 rounded-xl border border-border/50 bg-surface shadow-lg">
      <div
        onClick={toggleTableContents}
        className="px-4 py-3 cursor-pointer flex flex-row justify-evenly items-center gap-2"
      >
        <h2 className="text-label-bold font-semibold text-accent-primary tracking-wide uppercase">
          Table of Contents
        </h2>
        <p className='text-text-muted text-body-sm'>
          {activeTableContents ? <FaChevronUp /> : <FaChevronDown />}
        </p>
      </div>
      <nav
        className={`transition-all duration-300 overflow-y-auto scrollbar-thin ${
          activeTableContents
            ? 'p-2 max-h-[40vh] translate-y-0'
            : 'p-0 max-h-0 -translate-y-2'
        }`}
      >
        <ul className="flex flex-col gap-1">
          {contents.map((item) => {
            const isActive = activeId === item;
            return (
              <li key={item}>
                <a
                  href={`#${item}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => (handleClick(item))}
                  className={`block rounded-lg px-3 py-2 text-body-sm transition-colors hover:bg-surface-hover hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary ${
                    isActive
                      ? 'bg-surface-hover text-accent-primary font-medium'
                      : 'text-text-primary'
                  }`}
                >
                  {toTitleCase(item)}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default TableOfContents;
