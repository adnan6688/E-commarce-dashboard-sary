
import type { LucideIcon } from "lucide-react"
import { Link } from "react-router"

type NavItemProps = {
  icon: LucideIcon
  label: string
  active: boolean
  destination: string
}

const NavItem = ({ icon: Icon, label, active, destination }: NavItemProps) => {
  return (
    <Link to={destination}>
      <div
        className={`
          flex items-center gap-3 px-3 py-2 cursor-pointer
          transition-all duration-300
          ${
            active
              ? "bg-white border-l-8 border-[var(--btn-deep)] ml-4"
              : "text-white hover:bg-white/10 hover:text-violet-400"
          }
        `}
      >
        <Icon
          size={20}
          color={active ? "var(--btn-deep)" : "#ffffff"}
        />

        <span
          className={`text-sm ${
            active
              ? "text-[var(--btn-deep)] font-semibold"
              : "text-white"
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  )
}

export default NavItem
