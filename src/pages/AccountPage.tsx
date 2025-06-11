import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "../components/Header";
import { HistoryItem } from "../components/HistoryItem";
import { EmptyState } from "../components/EmptyState";
import { useStore } from "../store/useStore";

export const AccountPage: React.FC = () => {
  const history = useStore((state) => state.history);
  const fetchHistory = useStore((state) => state.fetchHistory);
  const isLoading = useStore((state) => state.isLoading);
  const telegramUser = useStore((state) => state.telegramUser);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <>
      <Header
        title={telegramUser?.first_name || "Account"}
        showSearch={false}
      />
      <main className="page-container">
        <div className="user-profile">
          {telegramUser?.photo_url ? (
            <img
              src={telegramUser.photo_url}
              alt={telegramUser.first_name}
              className="user-avatar"
            />
          ) : (
            <div className="user-avatar-placeholder">
              {telegramUser?.first_name?.charAt(0) || "A"}
            </div>
          )}
          <h2 className="user-name">{telegramUser?.first_name || "User"}</h2>
          {telegramUser?.username && (
            <p className="user-username">@{telegramUser.username}</p>
          )}
        </div>

        <h2 className="section-title">Purchase History</h2>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {history.length === 0 ? (
              <EmptyState
                icon="lucide:clock"
                title="No purchases yet"
                message="Your purchase history will appear here"
              />
            ) : (
              <AnimatePresence>
                {history.map((item) => (
                  <HistoryItem key={item.timestamp} item={item} />
                ))}
              </AnimatePresence>
            )}
          </>
        )}
      </main>
    </>
  );
};
