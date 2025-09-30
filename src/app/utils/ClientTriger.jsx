import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

const ClientTriger = () => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#5965AB] text-white">+ Create Client</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Client</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={formHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 p-2 h-84 overflow-y-auto"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Company Name</Label>
              <Input className="mt-2" id="name" name="name" placeholder="Enter company name" required />
            </div>

            <div>
              <Label htmlFor="companyAddress">Company Address</Label>
              <Input className="mt-2" id="companyAddress" name="companyAddress" placeholder="Enter company address" />
            </div>

            <div>
              <Label htmlFor="companyPhoneNumber">Company Phone</Label>
              <Input className="mt-2" id="companyPhoneNumber" name="companyPhoneNumber" placeholder="Enter phone number" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Company Logo</Label>
              <Input
                type="file"
                className="mt-2"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              {/* ✅ Image Preview */}
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-md border"
                />
              )}
            </div>

            <div>
              <Label htmlFor="stripePublic">Stripe Public Key</Label>
              <Input className="mt-2" id="stripePublic" name="stripePublic" placeholder="Enter Stripe Public Key" />
            </div>

            <div>
              <Label htmlFor="stripePrivate">Stripe Private Key</Label>
              <Input className="mt-2" id="stripePrivate" name="stripePrivate" placeholder="Enter Stripe Private Key" />
            </div>
          </div>

          <DialogFooter className="col-span-2 flex justify-end gap-3 mt-4">
            <Button type="submit" className="bg-[#5965AB] text-white" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ClientTriger