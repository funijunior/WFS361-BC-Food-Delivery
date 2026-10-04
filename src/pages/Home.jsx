/**
 * Home.jsx
 * ----------------------------------------------------------
 * BC Eats — homepage.
 *
 * Phase 5:
 *  - Controlled search
 *  - Category filtering
 *  - Food-grid integration
 *  - Accessible result updates
 *  - Clear-filter flow
 */

import { useMemo, useState } from 'react';

import Hero from '../components/Hero.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import FoodGrid from '../components/FoodGrid.jsx';
import Footer from '../components/Footer.jsx';

import { FOOD_DATA } from '../data/foodData.js';
import { CATEGORIES } from '../constants/categories.js';

import '../styles/homePage.css';

export default function Home() {
  const [activeCategory, setActiveCategory] =
    useState('all');

  const [searchQuery, setSearchQuery] =
    useState('');

  const categoryCounts = useMemo(() => {
    return FOOD_DATA.reduce(
      (counts, item) => {
        counts[item.category] =
          (counts[item.category] || 0) + 1;

        return counts;
      },
      {},
    );
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  const handleHeroSearch = (query) => {
    setSearchQuery(query);

    document
      .getElementById('menu')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  const handleHeroCategory = (category) => {
    setActiveCategory(category);

    document
      .getElementById('menu')
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  return (
    <>
      <main className="home-page">
        <Hero
          onSearch={handleHeroSearch}
          onCategoryClick={handleHeroCategory}
        />

        <section
          id="delivery"
          className="home-page__delivery"
          aria-labelledby="delivery-title"
        >
          <div className="home-page__container home-page__delivery-inner">
            <div className="home-page__section-header">
              <p className="home-page__eyebrow">
                Fast delivery
              </p>

              <h2
                id="delivery-title"
                className="home-page__section-title"
              >
                Campus food delivery that keeps up with your day.
              </h2>
            </div>

            <div className="home-page__delivery-grid">
              <article className="home-page__feature-card">
                <span className="home-page__feature-badge">
                  15–25 min
                </span>
                <h3>Quick drop-offs</h3>
                <p>
                  We deliver across campus from student hubs to lecture blocks, so your meal arrives while the moment is still fresh.
                </p>
              </article>

              <article className="home-page__feature-card">
                <span className="home-page__feature-badge">
                  Smart routing
                </span>
                <h3>Built for convenience</h3>
                <p>
                  Choose your delivery point and get a smooth order flow designed around student schedules and busy campus days.
                </p>
              </article>

              <article className="home-page__feature-card">
                <span className="home-page__feature-badge">
                  Fresh every time
                </span>
                <h3>Made to order</h3>
                <p>
                  We keep your food hot, organised, and easy to collect with simple campus-friendly delivery planning.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="home-page__about"
          aria-labelledby="about-title"
        >
          <div className="home-page__container home-page__about-inner">
            <div className="home-page__section-header home-page__section-header--left">
              <p className="home-page__eyebrow">
                Our story
              </p>

              <h2
                id="about-title"
                className="home-page__section-title"
              >
                BC Eats started with one idea: better food, closer to campus.
              </h2>
            </div>

            <div className="home-page__about-content">
              <p>
                BC Eats was built for students who want great meals without wasting time in long queues or rushing between classes.
                We partnered with campus favourites and everyday comfort foods to make ordering simple, quick, and satisfying.
              </p>
              <p>
                From late-night study sessions to early morning lectures, our mission is to make campus life easier with food that feels fresh, familiar, and worth the wait.
              </p>
            </div>
          </div>
        </section>

        <section
          id="menu"
          className="home-page__menu"
          aria-labelledby="menu-title"
        >
          <div className="home-page__container">
            <div className="home-page__menu-header">
              <div>
                <p className="home-page__eyebrow">
                  Today&apos;s menu
                </p>

                <h1
                  id="menu-title"
                  className="home-page__title"
                >
                  What are you craving?
                </h1>

                <p className="home-page__description">
                  Fresh campus favourites,
                  ready when you are.
                </p>
              </div>

              <div
                className="home-page__count"
                aria-label={`${FOOD_DATA.length} meals available`}
              >
                {FOOD_DATA.length}{' '}
                {FOOD_DATA.length === 1
                  ? 'meal'
                  : 'meals'}
              </div>
            </div>

            <div className="home-page__search">
              <SearchBar
                value={searchQuery}
                onChange={handleSearch}
                onSearch={handleSearch}
                onClear={() =>
                  setSearchQuery('')
                }
                placeholder="Search burgers, pizza, drinks…"
                ariaLabel="Search the menu"
                size="lg"
              />
            </div>

            <div
              id="categories"
              className="home-page__categories"
            >
              <CategoryFilter
                categories={CATEGORIES}
                active={activeCategory}
                onChange={handleCategoryChange}
                counts={{
                  all: FOOD_DATA.length,
                  ...categoryCounts,
                }}
              />
            </div>

            <div className="home-page__food">
              <FoodGrid
                items={FOOD_DATA}
                category={activeCategory}
                query={searchQuery}
                onClearFilters={
                  handleClearFilters
                }
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}