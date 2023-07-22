import { DataGrid, SelectBox, Button } from "devextreme-react";
import "devextreme/dist/css/dx.dark.css";
import "./App.css";
import { locales, payments, dictionary } from "./data";
import deMessages from "devextreme/localization/messages/de.json";
import ruMessages from "devextreme/localization/messages/ru.json";

import { loadMessages, locale, formatMessage } from "devextreme/localization";
import { Column, Editing, FilterRow } from "devextreme-react/data-grid";
import { useState } from "react";

const getLocale = () => {
  const storageLocale = sessionStorage.getItem("locale");
  return storageLocale != null ? storageLocale : "en";
};

function App() {
  const [localeState, setLocaleState] = useState(getLocale);

  const selectBoxInputAttr = { id: "selectInput" };

  const setLocale = (savingLocale) => {
    sessionStorage.setItem("locale", savingLocale);
  };

  const changeLocale = (data) => {
    setLocaleState(data.value);
    setLocale(data.value);
    document.location.reload();
  };

  const initMessages = () => {
    loadMessages(deMessages);
    loadMessages(ruMessages);
    loadMessages(dictionary);
  };

  initMessages();

  locale(localeState);

  const editPopupOptions = {
    width: 700,
    height: 345,
  };

  return (
    <div className="App">
      <DataGrid
        dataSource={payments}
        columnAutoWidth={true}
        keyExpr="PaymentId"
      >
        <Column
          dataField="PaymentId"
          caption={formatMessage("Number")}
          allowEditing={false}
        />
        <Column dataField="ContactName" caption={formatMessage("Contact")} />
        <Column dataField="CompanyName" caption={formatMessage("Company")} />
        <Column dataField="Amount" caption={formatMessage("Amount")} />
        <Column
          dataField="PaymentDate"
          caption={formatMessage("PaymentDate")}
        />
        <FilterRow visible={true} applyFilter="auto" />
        <Editing mode="popup" allowUpdating={true} popup={editPopupOptions} />
      </DataGrid>
      <Button type="success" text={formatMessage("BtnText")} />
      <div className="options">
        <div className="caption">Options</div>
        <div className="option">
          <label htmlFor="selectInput">Language</label>
          &nbsp;
          <SelectBox
            items={locales}
            valueExpr="value"
            displayExpr="name"
            value={localeState}
            onValueChanged={changeLocale}
            inputAttr={selectBoxInputAttr}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
