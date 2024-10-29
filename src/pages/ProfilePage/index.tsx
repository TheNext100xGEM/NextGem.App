import { Helmet } from "react-helmet-async"
import AccountSidebar from "@components/Sidebar"
import { User, Camera } from "lucide-react"
import "./_profile.scss"
import { Button, Input } from "@components/ui"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
// import { useNavigate } from "react-router-dom"

function EditAccount() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePicture: null as File | null
  })

//   const navigate = useNavigate()

  useEffect(() => {
    // Extract token from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get("token")

    // If a token is found in the URL
    if (token) {
      // Store the token in cookies as 'web3Token'
      Cookies.set("web3Token", token, { expires: 1 })  // Set expiration to 1 day

      // Remove the 'token' from the URL
      urlParams.delete("token")
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`
      window.history.replaceState({}, document.title, newUrl)
    }
  }, [])

  // Extract token from cookies
  const token = Cookies.get("web3Token")

  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Handle profile picture change
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, profilePicture: file }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare form data for submission
    const updatedData = new FormData()
    updatedData.append("firstName", formData.firstName)
    updatedData.append("lastName", formData.lastName)
    updatedData.append("email", formData.email)
    updatedData.append("phone", formData.phone)

    if (formData.profilePicture) {
      updatedData.append("profilePicture", formData.profilePicture)
    }

    try {
      // Make the request to update the account details with the token in the headers
      const response = await axios.put("/api/update-profile", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })

      if (response.status === 200) {
        alert("Profile updated successfully!")
      } else {
        alert("Failed to update profile. Please try again.")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <div className="edit-account-page">
      <Helmet>
        <title>Edit Account | NextGem AI</title>
      </Helmet>

      <div className="content-wrapper">
        <AccountSidebar />
        <main className="main-content">
          <div className="account-form-container">
            <div className="profile-picture-container">
              <div className="profile-picture">
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile"
                    className="uploaded-profile-picture"
                  />
                ) : (
                  <User size={48} />
                )}
              </div>
              <label htmlFor="profilePicture" className="camera-icon">
                <Camera size={20} />
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="file-input"
                  style={{visibility: 'hidden'}}
                />
              </label>
            </div>

            <form className="account-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Smith"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="johnsmith123@xyz.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone No.</label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+012345678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e)}
                />
              </div>

              <div className="form-actions">
                <Button className="edit-details-btn">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default EditAccount
