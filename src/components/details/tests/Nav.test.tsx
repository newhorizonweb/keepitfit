


// RTL & React
import { render, screen, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import { act } from 'react';

// Redux
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from "../../redux/store";

// i18next
import { I18nextProvider } from 'react-i18next';
import i18next from "../../app/i18n";

// Components
import Nav from '../Nav';

// Mocks
const mockNav = () => {

    // const mockLoadFavSearch = jest.fn();
    // isInfoOpen={true}
    // loadFavSearch={mockLoadFavSearch}

    return(
        <Provider store={store}>
            <BrowserRouter>
                <I18nextProvider i18n={i18next}>
                    <Nav />
                </I18nextProvider>
            </BrowserRouter>
        </Provider>
    )
}

    /* Tests */

describe("Nav", () => {

    describe("Language List", () => {

        it('renders the language selection dropdown button', async () => {

            await act(async () => {
                render(
                    mockNav()
                );
            });

            const langBtn = await screen.findByLabelText(/Change language/i);
            expect(langBtn).toBeInTheDocument();

        });

        it('checks if the language list is not visible on page load', async () => {

            await act(async () => {
                render(
                    mockNav()
                );
            });

            const langDropdown = screen.getByTestId("lang-switch-dropdown");
            expect(langDropdown).not.toBeVisible();

        });

        it('checks if the language list is visible on button click', async () => {

            await act(async () => {
                render(
                    mockNav()
                );
            });

            const langBtn = await screen.findByLabelText(/Change language/i);
            fireEvent.click(langBtn);

            const langDropdown = screen.getByTestId("lang-switch-dropdown");
            expect(langDropdown).toBeVisible();

        });

        it('checks if the language list is collapsed after 2 button clicks', async () => {

            await act(async () => {
                render(
                    mockNav()
                );
            });

            const langBtn = await screen.findByLabelText(/Change language/i);
            fireEvent.click(langBtn);
            fireEvent.click(langBtn);

            const langDropdown = screen.getByTestId("lang-switch-dropdown");
            expect(langDropdown).not.toBeVisible();

        });

        it('checks if the language switching works', async () => {

            await act(async () => {
                render(
                    mockNav()
                );
            });

            // Click on English first to make sure it's not auto set to German
            const langEnglish = 
                await screen.findByTestId(/lang-switch-English/i);
            fireEvent.click(langEnglish);

            // Change the language to German
            const langGerman = 
                await screen.findByTestId(/lang-switch-Deutsch/i);
            fireEvent.click(langGerman);
            
            await act(async () => {
                expect(localStorage.getItem("i18nextLng")).toBe("de");
            });

        });

    });

    describe("Favorites", () => {

        it('should display the bookmarked search in the fav list', async () => {

            await act(async () => {
                render(
                    mockNav()
                );
            });

            // Set the search keyword
            localStorage.setItem("current-search-val", "tomato");

            // Bookmark the search keyword
            const navBookmark = await screen.findByTestId(/nav-bookmark/i);
            fireEvent.click(navBookmark);

            const favListElem = await screen.findByTestId(/tomato/i);
            expect(favListElem).toHaveTextContent(/tomato/i);

        });
        
    });

});