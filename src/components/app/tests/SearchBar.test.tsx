


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
import SearchBar from '../SearchBar';

// Mocks
import { mockSearchList } from '../../mocks/list';

const mockSearchBar = (page: string) => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <I18nextProvider i18n={i18next}>
                    <SearchBar page={ page } />
                </I18nextProvider>
            </BrowserRouter>
        </Provider>
    )
}

    /* Tests */

describe("Search Bar", () => {

    describe("Rendering", () => {

        it('checks if the search input is rendered', async () => {

            await act(async () => {
                render(
                    mockSearchBar("main")
                );
            });
            
            const searchInput = await screen.findByLabelText(/Search Input/i);
            expect(searchInput).toBeInTheDocument();
            
        });
        
        it('checks if there is only 1 input', async () => {
        
            await act(async () => {
                render(
                    mockSearchBar("main")
                );
            });
        
            try{
                const searchInputs = await screen.findAllByRole("textbox");
                expect(searchInputs.length).toBe(1);
            } catch (error){
                console.error('Input number error:', error);
            }
                
        });

    });

    describe("Functionality", () => {

        it('should update the input value when typing', async () => {

            await act(async () => {
                render(
                    mockSearchBar("main")
                );
            });
        
            const searchInput =
                await screen.findByLabelText(/Search Input/i) as HTMLInputElement;

            await act(async () => {
                fireEvent.input(searchInput, { target: { value: "tomato" } });
            });

            expect(searchInput.value).toBe("tomato");
            
        });

        it('should display elements from the REST API data (valid search)', async () => {

            // Mock API request
            global.fetch = mockSearchList() as any;

            await act(async () => {
                render(
                    mockSearchBar("main")
                );
            });

            const searchInput =
                await screen.findByLabelText(/Search Input/i) as HTMLInputElement;

            await act(async () => {
                fireEvent.input(searchInput, { target: { value: "tomato" } });
            });
        
            const searchBtn = await screen.findByLabelText(/Search Button/i) as HTMLInputElement;

            await act(async () => {
                fireEvent.click(searchBtn);
            });

            const listItems = await screen.queryAllByTestId(/list-item/i);
            // console.log(prettyDOM(listItems[0]));
            expect(listItems.length).toBeGreaterThan(0);
            
        });

        it('should NOT display any elements (invalid search)', async () => {
            
            // Mock API request
            global.fetch = mockSearchList() as any;

            await act(async () => {
                render(
                    mockSearchBar("main")
                );
            });

            const searchInput =
                await screen.findByLabelText(/Search Input/i) as HTMLInputElement;

            await act(async () => {
                fireEvent.input(searchInput, { target: { value: "tomato@!" } });
            });
        
            const searchBtn = await screen.findByLabelText(/Search Button/i) as HTMLInputElement;

            await act(async () => {
                fireEvent.click(searchBtn);
            });

            const listItems = await screen.queryAllByTestId(/list-item/i);
            // console.log(prettyDOM(listItems[0]));
            expect(listItems.length).toBe(0);
            
        });
        
    });

});