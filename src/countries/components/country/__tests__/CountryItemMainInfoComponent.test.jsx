import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CountryItemMainInfoComponent } from '../CountryItemMainInfoComponent';
import { countryDetailsMock } from "./mockCountryDetail";

describe('CountryItemMainInfoComponent', () => {
  it('renders country main info correctly with full mock data', () => {
    render(<CountryItemMainInfoComponent countryDetails={countryDetailsMock} />);

    const flagImg = screen.getByRole('img', {
      name: /the flag of spain is composed/i,
    });
    expect(flagImg).toBeInTheDocument();
    expect(flagImg).toHaveAttribute('src', countryDetailsMock.flags.svg);

    expect(screen.getByText(countryDetailsMock.name.common)).toBeInTheDocument();
    expect(screen.getByText(countryDetailsMock.name.official)).toBeInTheDocument();

    expect(screen.getByText(countryDetailsMock.capital[0])).toBeInTheDocument();
    expect(screen.getByText(countryDetailsMock.region)).toBeInTheDocument();
    expect(screen.getByText(countryDetailsMock.subregion)).toBeInTheDocument();
    expect(
      screen.getByText(countryDetailsMock.population.toLocaleString())
    ).toBeInTheDocument();

    expect(screen.getByTestId('main-info')).toBeInTheDocument();
  });

  it('shows "N/A" for missing fields', () => {
    const incompleteCountry = {
      name: { common: 'Unknown', official: 'Unknown' },
      flags: {},
    };
    render(<CountryItemMainInfoComponent countryDetails={incompleteCountry} />);

    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
  });
});
