import "./App.css";
import "./styles.scss";
import Header from "./header";
import MainPage_ali from "./pages/MainPage_ali";
import Deregister_ali from "./pages/deregister_ali";
import Register_imran from "./pages/register_imran";
import { Page } from "govuk-react";
import { Footer } from "govuk-react";
import { Link } from "govuk-react";
import Info from "./info";
import { TopNav } from "govuk-react";

function App() {
  return (
    <div className="App">
      <Page
        header={
          <TopNav
            children={
              <div>
                <Link href="about" class="blue">
                  about
                </Link>
                <Link href="location">location</Link>
              </div>
            }
          ></TopNav>
        }
      >
        <Info></Info>
      </Page>
      <Footer></Footer>
    </div>
  );
}

export default App;
