import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { EllipsisVertical, Plus } from "lucide-react";

import { useStore } from "@/context/StoreContext";
import StockTable from "@/pages/StockTable";
import { useModal } from "@/context/ModalContext";
import StoreForm from "@/components/forms/StoreForm";
import { Store } from "@/types/types";

const StoreCardSkeleton: React.FC = () => {
  return (
    <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-3/5 rounded-lg" />
      </div>
    </div>
  );
};

const StoreCard: React.FC<{
  name: string;
  location: string;
  onClick: () => void;
  deleteStore: () => void;
}> = ({ name, location, onClick, deleteStore }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div
      className={
        "text-white gap-3 h-20 max-w-[300px] w-[300px] shadow-2xl backdrop-blur-3xl rounded-lg flex flex-row justify-between items-start px-6 py-3 hover:bg-gray-900"
      }
      onClick={onClick}
    >
      <Avatar size="lg" src="" />
      <div className="flex flex-col gap-1">
        <span className="text-white font-bold text-lg">{name}</span>
        <span className="text-sm text-gray-500">{location}</span>
      </div>
      <Dropdown>
        <DropdownTrigger className={"py-1.5"}>
          <button>
            <EllipsisVertical size={16} />
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant={"flat"}>
          <DropdownItem
            key="delete"
            className="text-danger font-bold"
            color="danger"
            onClick={deleteStore}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

const InventoryPage = () => {
  const { state, fetchStores, createStore, dispatch, deleteStore } = useStore();
  const { stores } = state;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetchStores();
      } catch (err) {
        setError("Failed to fetch stores.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then();
  }, [fetchStores]);
  const handleNewStoreSubmit = async (
    store_id: number,
    name: string,
    location: string,
  ) => {
    try {
      await createStore({ store_id, name, location });
      await fetchStores();
      closeModal();
    } catch (err) {
      console.error("Failed to create store:", err);
    }
  };

  const handleNewStoreClick = () => {
    openModal(
      <StoreForm onClose={closeModal} onSubmit={handleNewStoreSubmit} />,
    );
  };
  const handleStoreCardClick = (store: Store) => {
    dispatch({ type: "SET_SELECTED_STORE", payload: store });
  };
  const handleDeleteStore = (id: number) => {
    deleteStore(id).then();
    dispatch({ type: "DELETE_STORE", payload: id });
  };

  return (
    <div className={"h-full w-full flex flex-col gap-4"}>
      <div
        className={
          "h-48 w-full rounded-md drop-shadow-lg bg-opacity-90 backdrop-blur-3xl flex flex-col justify-center"
        }
      >
        <span className={"px-10 font-extrabold text-2xl"}>Stores:</span>
        <div
          className={"flex flex-row items-end justify-between gap-4 px-10 py-2"}
        >
          <div className="flex flex-row items-center justify-start gap-4 w-full overflow-x-auto">
            {loading || error
              ? Array.from({ length: 3 }).map((_, index) => (
                  <StoreCardSkeleton key={index} />
                ))
              : stores.map((s) => (
                  <StoreCard
                    key={s.store_id}
                    deleteStore={() => handleDeleteStore(s.store_id)}
                    location={s.location}
                    name={s.name}
                    onClick={() => handleStoreCardClick(s)}
                  />
                ))}
          </div>
          <Button
            className={"font-bold"}
            color={"success"}
            variant={"flat"}
            onClick={handleNewStoreClick}
          >
            <Plus size={40} />
            New Store
          </Button>
        </div>
      </div>
      <div
        className={
          "h-full w-full flex-1 rounded-md drop-shadow-lg bg-opacity-90 backdrop-blur-3xl"
        }
      >
        <StockTable />
      </div>
    </div>
  );
};

export default InventoryPage;
