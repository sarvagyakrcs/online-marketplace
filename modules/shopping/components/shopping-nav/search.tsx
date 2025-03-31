import { Button } from '@/components/ui/button'
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Field } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
    //TODO: Add search functionality
  return (
    <>
      <Button outline className='border-none' type="button" onClick={() => setIsOpen(true)}>
        <SearchIcon size={17} />
        <span className="sr-only">Search</span>
      </Button>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Search Products</DialogTitle>
        <DialogDescription>
            <p className="text-sm text-muted-foreground">
                Enter the product name or category you want to search for.
            </p>
        </DialogDescription>
        <DialogBody>
          <Field>
            <Input name="amount" placeholder="Wedding Decorations" />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Search</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}