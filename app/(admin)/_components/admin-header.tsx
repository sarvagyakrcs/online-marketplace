import { auth } from '@/auth'
import SignOutButton from '@/components/auth/sign-out-button'
import { Logo } from '@/components/global/logo'
import { SearchDialog } from '@/modules/shopping/components/shopping-nav/search-input'
import UserButton from '@/modules/shopping/components/shopping-nav/user-button'
import Link from 'next/link'

const AdminHeader = async () => {
  const session = await auth()
  return (
    <header className="relative">
      <nav aria-label="Top">
        {/* Secondary navigation */}
        <div className="shadow-xs">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                <Logo link='/admin' />{" "}+admin

              {/* Mobile menu and search (lg-) */}
              <div className="flex flex-1 items-center lg:hidden">
                {/* Search */}
                <SearchDialog />
              </div>

              <div className="flex flex-1 items-center justify-end">
                <Link
                  href="#"
                  className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                >
                  Search
                </Link>

                <div className="flex items-center lg:ml-8">
                  <UserButton session={session} />
                </div>
              </div>
              <SignOutButton session={session} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default AdminHeader
