import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { auth } from "@/Firebase/Config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const ProSidebarContent = ({ user }) => {
  const router = useRouter();
  const path = usePathname();
  const handleLogoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log("logout successful");
        router.push("/login");
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {mobileMenuItems.map((item) =>
          item.label === "Home" || item.label === "Listings" ? (
            <MenuItem
              key={item.label}
              component={
                <Link
                  className={item.label == path ? "active" : ""}
                  href={item.href}
                />
              }
            >
              {item.label}
            </MenuItem>
          ) : item.label === "Dashboard" && !user ? null : (
            <SubMenu key={item.label} label={item.label}>
              {item.subMenu?.map((subItem) =>
                subItem.subMenu ? (
                  <SubMenu key={subItem.label} label={subItem.label}>
                    {subItem.subMenu.map((nestedItem) => (
                      <MenuItem
                        key={nestedItem.label}
                        component={
                          <Link
                            className={nestedItem.path == path ? "active" : ""}
                            href={nestedItem.path}
                          />
                        }
                      >
                        {nestedItem.label}
                      </MenuItem>
                    ))}
                  </SubMenu>
                ) : (
                  <MenuItem
                    key={subItem.label}
                    component={
                      <Link
                        className={subItem.path == path ? "active" : ""}
                        href={subItem.path}
                      />
                    }
                  >
                    {subItem.label}
                  </MenuItem>
                )
              )}
            </SubMenu>
          )
        )}
        <MenuItem onClick={() => handleLogoutUser()}>Logout</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
