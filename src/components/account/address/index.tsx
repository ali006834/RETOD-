import React from "react";
import { observer } from "mobx-react-lite";
import { useTranslation, useStore } from "@ikas/storefront";

import NewAddress from "./new-address";
import AddressBox from "./address-box";

import useAddress from "./useAddress";
import AlertComponent from "src/components/components/alert";
import Button from "src/components/components/button";
import CloseIcon from "src/components/svg/close";
import Header from "../components/header";
import { useScreen } from "src/utils/hooks/useScreen";

import { NS } from "../";

import * as S from "./style";

const Address = () => {
  const store = useStore();
  const { t } = useTranslation();
  const { isSmall } = useScreen();
  const {
    isAddressFormVisible,
    addressForm,
    addressesCount,
    hasAddress,
    onAddNewAddressClick,
    onAddressFormClose,
    onAddressSave,
    onAddresEdit,
    onAddressDelete,
  } = useAddress();

  const headerTitle = isAddressFormVisible
    ? addressForm?.isEdit
      ? t(`${NS}:address.editAddress`)
      : t(`${NS}:address.createAddress`)
    : `${t(`${NS}:address.myAddresses`)} (${addressesCount})`;

  const headerRightChild = !hasAddress ? undefined : isAddressFormVisible ? (
    <button
      title="Close"
      onClick={onAddressFormClose}
      style={{ border: "none", background: "none" }}
    >
      <CloseIcon />
    </button>
  ) : (
    <Button
      title={t(`${NS}:address.addNewAddress`)}
      size="small"
      onClick={onAddNewAddressClick}
    >
      <PlusIcon />
      {!isSmall && <div>{t(`${NS}:address.addNewAddress`)}</div>}
    </Button>
  );

  return (
    <div>
      <Header title={headerTitle} rightChild={headerRightChild} />
      {!hasAddress && (
        <AlertComponent
          status="info"
          text={t(`${NS}:address.noAddressPlaceholder`)}
        />
      )}
      <S.AddressBoxes $visible={!isAddressFormVisible}>
        {store.customerStore.customer?.addresses?.map((address, index) => (
          <AddressBox
            key={address.id}
            address={address}
            index={index}
            onDelete={onAddressDelete}
            onEdit={onAddresEdit}
          />
        ))}
      </S.AddressBoxes>
      {isAddressFormVisible && (
        <div
          style={{
            padding: "20px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <NewAddress addressForm={addressForm!} onSave={onAddressSave} />
        </div>
      )}
    </div>
  );
};

export default observer(Address);

const PlusIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1.3em"
    width="1.3em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
  </svg>
);
