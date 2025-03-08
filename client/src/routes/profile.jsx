import { useState } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon,
  UserCircleIcon,
  CameraIcon,
  ArrowUpTrayIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("avatar");
  const [avatar, setAvatar] = useState("/placeholder.svg?height=100&width=100");
  const [isUploading, setIsUploading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({ title: "", message: "", type: "" });

  // Password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const displayToast = (title, message, type = "success") => {
    setToast({ title, message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setAvatar(URL.createObjectURL(file));
        setIsUploading(false);
        displayToast(
          "Avatar updated",
          "Your profile picture has been updated successfully."
        );
      }, 1500);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      displayToast(
        "Passwords don't match",
        "New password and confirmation must match.",
        "error"
      );
      return;
    }

    setIsChangingPassword(true);

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      displayToast(
        "Password updated",
        "Your password has been changed successfully."
      );
    }, 1500);
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);

    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      displayToast(
        "Account deleted",
        "Your account has been permanently deleted.",
        "error"
      );
      router.push("/");
    }, 2000);
  };

  return (
    <div className="container max-w-4xl py-10 px-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      {/* Toast Notification */}
      {showToast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg max-w-md transform transition-all duration-300 ease-in-out ${
            toast.type === "error"
              ? "bg-red-50 border-l-4 border-red-500"
              : "bg-green-50 border-l-4 border-green-500"
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {toast.type === "error" ? (
                <XCircleIcon className="h-5 w-5 text-red-400" />
              ) : (
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
              )}
            </div>
            <div className="ml-3">
              <h3
                className={`text-sm font-medium ${
                  toast.type === "error" ? "text-red-800" : "text-green-800"
                }`}
              >
                {toast.title}
              </h3>
              <div
                className={`mt-1 text-sm ${
                  toast.type === "error" ? "text-red-700" : "text-green-700"
                }`}
              >
                {toast.message}
              </div>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setShowToast(false)}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  toast.type === "error"
                    ? "text-red-500 hover:bg-red-100 focus:ring-red-600"
                    : "text-green-500 hover:bg-green-100 focus:ring-green-600"
                }`}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("avatar")}
              className={`py-4 px-1 w-1/3 text-center border-b-2 font-medium text-sm ${
                activeTab === "avatar"
                  ? "border-blue-500 text-white"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`}
            >
              Avatar
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`py-4 px-1 w-1/3 text-center border-b-2 font-medium text-sm ${
                activeTab === "password"
                  ? "border-blue-500 text-white"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`}
            >
              Password
            </button>
            <button
              onClick={() => setActiveTab("danger")}
              className={`py-4 px-1 w-1/3 text-center border-b-2 font-medium text-sm ${
                activeTab === "danger"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
              }`}
            >
              Danger Zone
            </button>
          </nav>
        </div>
      </div>

      {/* Avatar Tab */}
      {activeTab === "avatar" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Profile Picture
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Update your profile picture. This will be displayed on your
              profile and in comments.
            </p>
          </div>
          <div className="px-6 py-5 space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-full">
                    <ArrowPathIcon className="animate-spin h-6 w-6 text-blue-500" />
                  </div>
                )}
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100">
                  {avatar ? (
                    <img
                      src={avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <UserCircleIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-gray-100 border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={() =>
                    document.getElementById("avatar-upload").click()
                  }
                >
                  <CameraIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => document.getElementById("avatar-upload").click()}
              >
                <ArrowUpTrayIcon className="h-4 w-4 mr-2 text-gray-500" />
                Upload new image
              </button>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              className="text-sm text-gray-700 hover:text-gray-500 font-medium"
              onClick={() => setAvatar("/placeholder.svg?height=100&width=100")}
            >
              Reset
            </button>
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save changes
            </button>
          </div>
        </div>
      )}

      {/* Password Tab */}
      {activeTab === "password" && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Change Password
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Update your password to keep your account secure.
            </p>
          </div>
          <div className="px-6 py-5">
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full mt-6 inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isChangingPassword ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword
                }
              >
                {isChangingPassword ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Danger Zone Tab */}
      {activeTab === "danger" && (
        <div className="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-red-200 bg-red-50">
            <h3 className="text-lg font-medium text-red-800">Danger Zone</h3>
            <p className="mt-1 text-sm text-red-600">
              Permanently delete your account and all of your data.
            </p>
          </div>
          <div className="px-6 py-5">
            <div className="rounded-lg border border-red-300 p-4 bg-red-50">
              <h3 className="font-medium text-red-800">Delete Account</h3>
              <p className="text-sm text-red-600 mt-2">
                Once you delete your account, there is no going back. This
                action is permanent and cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="mt-4 inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setShowDeleteDialog(false)}
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Are you absolutely sure?
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
