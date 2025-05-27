import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CountryItemAditonalInfoComponent } from '../CountryItemAditonalInfoComponent';
import { countryDetailsMock } from './mockCountryDetail'; 

describe('CountryItemAditonalInfoComponent', () => {
  it('renders additional info correctly with full mock data', () => {
    render(<CountryItemAditonalInfoComponent countryDetails={countryDetailsMock} />);

    expect(screen.getByText(`${countryDetailsMock.area.toLocaleString()} km²`)).toBeInTheDocument();

    Object.values(countryDetailsMock.currencies).forEach(({ name, symbol }) => {
      expect(screen.getByText(new RegExp(`${name} \\(${symbol}\\)`))).toBeInTheDocument();
    });

    expect(
      screen.getByText(Object.values(countryDetailsMock.languages).join(', '))
    ).toBeInTheDocument();

    expect(screen.getByText(/miembro de la onu/i)).toBeInTheDocument();
    expect(screen.getByText(/país independiente/i)).toBeInTheDocument();

    const circles = screen.getAllByRole('presentation', { hidden: true }) || [];

    const greenCircles = screen.getAllByTestId
      ? screen.getAllByTestId('status-circle-green')
      : screen.container.querySelectorAll('.bg-green-500');
    expect(greenCircles.length).toBeGreaterThanOrEqual(2);

    const mapsLink = screen.getByRole('link', { name: /ver en google maps/i });
    expect(mapsLink).toBeInTheDocument();
    expect(mapsLink).toHaveAttribute('href', countryDetailsMock.maps.googleMaps);
    expect(mapsLink).toHaveAttribute('target', '_blank');
    expect(mapsLink).toHaveAttribute('rel', 'noopener noreferrer');

    expect(screen.getByTestId('additional-info')).toBeInTheDocument();
  });

  it('renders fallbacks when data is missing', () => {
    const incompleteCountry = {};
    render(<CountryItemAditonalInfoComponent countryDetails={incompleteCountry} />);

    expect(screen.getByText('N/A km²')).toBeInTheDocument();
    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
  });
});
