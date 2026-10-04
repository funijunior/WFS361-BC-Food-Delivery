/**
 * Hero.jsx
 * ----------------------------------------------------------
 * Cinematic parallax hero — the showpiece of the home page.
 *
 * Layers:
 *  1. Ambient background image + gradient + floating orbs
 *  2. Left: eyebrow, headline (gradient accent), subtitle,
 *     glass search panel (search + delivery select + CTA),
 *     popular categories chips
 *  3. Right: floating food imagery (parallax on scroll, gentle
 *     float animation) — main plate + 3 orbiting plates
 *  4. Statistics strip (4 glass stat cards)
 *
 * WOW factors: parallax food, animated search glow, floating orbs,
 *              staggered entrance, gradient headline accent.
 *
 * Props:
 *  - onSearch(query)        -> lifts search state to parent
 *  - onDeliveryChange(id)   -> lifts selected delivery location
 *  - onCategoryClick(id)    -> scrolls to menu filtered by cat
 *
 * Accessibility:
 *  - <section aria-labelledby="hero-title">
 *  - Search input has label (sr-only) + aria-label
 *  - Delivery select labelled; stats in a list with aria-label
 *  - Reduced-motion respected (CSS + Framer Motion useReducedMotion)
 */

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

import Button from './Button';
import { POPULAR_CATEGORIES } from '../constants/categories.js';
import { DELIVERY_LOCATIONS } from '../constants/deliveryLocations.js';
import { getCategoryIcon } from '../utils/categoryIcons.js';

import { SearchIcon, DeliveryIcon } from '../utils/icons.jsx';

import { FOOD_DATA } from '../data/foodData.js';

import heroBg from '../assets/images/hero-bg.jpg';
import burgerImg from '../assets/foods/burger.png';
import pizzaImg from '../assets/foods/pizza.png';
import cokeImg from '../assets/foods/coke.png';
import friesImg from '../assets/foods/fries.png';

import '../styles/hero.css';

const averageDeliveryTime = Math.round(
  FOOD_DATA.reduce((total, item) => total + item.deliveryTime, 0) / FOOD_DATA.length,
);
const averageRating = (
  FOOD_DATA.reduce((total, item) => total + item.rating, 0) / FOOD_DATA.length
).toFixed(1);

const STATS = [
  { value: '120+', label: 'Menu items' },
  { value: `${averageDeliveryTime} min`, label: 'Avg delivery', accent: true },
  { value: '8', label: 'Campus zones' },
  { value: `${averageRating}★`, label: 'Student rating' },
];

export default function Hero({
  onSearch = () => { },
  onDeliveryChange = () => { },
  onCategoryClick = () => { },
}) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState('');

  // Parallax: background & visual move at different rates on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const visualY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Entrance stagger config
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSearchInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val); // live search
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={sectionRef}>
      {/* Background layers */}
      <div className="hero__bg" aria-hidden="true">
        <motion.img
          src={heroBg}
          alt=""
          className="hero__bg-image"
          style={reduceMotion ? undefined : { y: bgY }}
        />
        <div className="hero__bg-gradient" />
        <div className="hero__orb hero__orb--emerald hero__float" />
        <div className="hero__orb hero__orb--red hero__float hero__float--delay-2" />
      </div>

      <motion.div
        className="hero__inner"
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* LEFT — content + search */}
        <motion.div className="hero__content" variants={item}>
          <span className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            Open now · Campus delivery
          </span>

          <h1 className="hero__title" id="hero-title">
            Campus cravings,{' '}
            <span className="hero__title-accent">delivered.</span>
          </h1>

          <p className="hero__subtitle">
            Skip the tuckshop queue. Order your favourite meals, drinks and snacks
            and get them delivered to your residence, lecture hall or office
            in minutes.
          </p>

          {/* Glass search panel */}
          <form className="hero__panel" onSubmit={handleSearchSubmit} role="search">
            <label htmlFor="hero-search" className="sr-only">
              Search for food
            </label>
            <div className="hero__search">
              <SearchIcon className="hero__search-icon" />
              <input
                id="hero-search"
                className="hero__search-input"
                type="text"
                placeholder="Search burgers, pizza, drinks…"
                value={query}
                onChange={handleSearchInput}
                autoComplete="off"
              />
            </div>

            <div className="hero__panel-row">
              <div className="hero__select">
                <DeliveryIcon className="hero__select-icon" />
                <label htmlFor="hero-delivery" className="sr-only">
                  Delivery location
                </label>
                <select
                  id="hero-delivery"
                  className="hero__select-native"
                  defaultValue=""
                  onChange={(e) => onDeliveryChange(e.target.value)}
                >
                  <option value="" disabled>
                    Deliver to…
                  </option>
                  {DELIVERY_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.label} · {loc.eta} min
                    </option>
                  ))}
                </select>
                <svg
                  className="hero__select-caret"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <Button type="submit" variant="primary" size="lg" magnetic={false}>
                Find food
              </Button>
            </div>
          </form>

          {/* Popular categories */}
          <div className="hero__categories">
            <span className="hero__cat-label">Popular</span>
            {POPULAR_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  className="hero__cat"
                  onClick={() => onCategoryClick(cat.id)}
                >
                  <Icon className="hero__cat-icon" aria-hidden="true" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* RIGHT — floating food imagery */}
        <motion.div
          className="hero__visual"
          variants={item}
          style={reduceMotion ? undefined : { y: visualY }}
          aria-hidden="true"
        >
          <div className="hero__plate hero__plate--float hero__plate--float-1 hero__float hero__float--delay-1">
            <img src={pizzaImg} alt="" loading="eager" />
          </div>
          <div className="hero__plate hero__plate--float hero__plate--float-2 hero__float hero__float--delay-2">
            <img src={cokeImg} alt="" loading="eager" />
          </div>
          <div className="hero__plate hero__plate--float hero__plate--float-3 hero__float">
            <img src={friesImg} alt="" loading="eager" />
          </div>
          <div className="hero__plate hero__plate--main hero__float">
            <motion.img
              src={burgerImg}
              alt=""
              loading="eager"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Statistics */}
      <motion.ul
        className="hero__stats"
        aria-label="Platform statistics"
        initial={
          reduceMotion
            ? false
            : {
              opacity: 0,
              y: 30,
            }
        }
        animate={
          reduceMotion
            ? undefined
            : {
              opacity: 1,
              y: 0,
            }
        }
        transition={
          reduceMotion
            ? { duration: 0.01 }
            : {
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.6,
            }
        }
      >
        {STATS.map((stat) => (
          <li key={stat.label} className="hero__stat">
            <div
              className={`hero__stat-value ${stat.accent ? 'hero__stat-value-accent' : ''}`}
            >
              {stat.value}
            </div>
            <div className="hero__stat-label">{stat.label}</div>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
