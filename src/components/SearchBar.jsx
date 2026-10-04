/**
 * SearchBar.jsx
 * ----------------------------------------------------------
 * Reusable, accessible search input.
 *
 * Props:
 *  - value, onChange        -> controlled input
 *  - onSearch(query)        -> fired on Enter / submit
 *  - onClear()              -> fired when clear button clicked
 *  - placeholder
 *  - submitLabel            -> renders inline submit button if provided
 *  - size                   -> 'md' (default) | 'lg'
 *  - disabled
 *  - id                     -> for label association
 *  - ariaLabel
 *
 * Accessibility:
 *  - <form role="search"> wrapping a labelled input
 *  - Clear button has aria-label + aria-hidden when inactive
 *  - Focus glow is visible; keyboard accessible
 */
import { useId } from 'react';
import Button from './Button';
import { SearchIcon, CloseIcon, ArrowRightIcon } from '../utils/icons.jsx';
import '../styles/searchBar.css';

export default function SearchBar({
  value = '',
  onChange = () => {},
  onSearch = () => {},
  onClear = () => {},
  placeholder = 'Search the menu…',
  submitLabel,
  size = 'md',
  disabled = false,
  id,
  ariaLabel = 'Search the menu',
  className = '',
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const hasValue = value.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    onChange('');
    onClear();
  };

  const classes = [
    'searchbar',
    size === 'lg' && 'searchbar--lg',
    disabled && 'searchbar--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <form className={classes} role="search" onSubmit={handleSubmit}>
      <div className="searchbar__field">
        <SearchIcon className="searchbar__icon" />
        <label htmlFor={inputId} className="sr-only">
          {ariaLabel}
        </label>
        <input
          id={inputId}
          className="searchbar__input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          aria-label={ariaLabel}
          autoComplete="off"
        />
        <button
          type="button"
          className={`searchbar__clear ${hasValue ? 'searchbar__clear--visible' : ''}`}
          onClick={handleClear}
          aria-label="Clear search"
          tabIndex={hasValue ? 0 : -1}
          aria-hidden={!hasValue}
        >
          <CloseIcon />
        </button>
      </div>

      {submitLabel && (
        <Button
          type="submit"
          variant="primary"
          size={size === 'lg' ? 'lg' : 'md'}
          className="searchbar__submit"
          iconRight={ArrowRightIcon}
          magnetic={false}
        >
          {submitLabel}
        </Button>
      )}
    </form>
  );
}
