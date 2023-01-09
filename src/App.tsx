import { GlobalStyle } from "./global-style";
import { ThemeProvider } from "context/ThemeContext";
import { ListProvider } from "context/ListContext";
import { EditProvider } from "context/EditContext";
import Main from "./components/main/Main";
import { ItemProvider } from "context/ItemContext";

const App = () => {
	return (
		<div className="App">
			<ThemeProvider>
				<ListProvider>
					<EditProvider>
						<ItemProvider>
							<GlobalStyle />
							<Main />
						</ItemProvider>
					</EditProvider>
				</ListProvider>
			</ThemeProvider>
		</div>
	);
};

export default App;
