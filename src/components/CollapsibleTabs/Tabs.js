import React, { lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";

import CollapsibleTabs from "../CollapsibleTabs";
import pluginsDir from "../Plugins/pluginDir";

const Plugins = lazy(() => import("../Plugins"));

export const pinActionTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};
function Tabs({ onTransform }) {
  const [pinnedPlugins, setPinnedPlugins] = useState(
    JSON.parse(localStorage.getItem("pinnedPlugins") || "[]")
  );

  const handlePinChange = (selectedPlugin, pinActionType) => {
    let newPinnedPlugins = [];
    if (pinActionType === pinActionTypes.ADD) {
      newPinnedPlugins = [...pinnedPlugins, selectedPlugin.tagName];
    } else if (pinActionType === pinActionTypes.REMOVE) {
      newPinnedPlugins = pinnedPlugins.filter(
        pinnedPlugin => pinnedPlugin != selectedPlugin.tagName
      );
    }
    localStorage.setItem("pinnedPlugins", JSON.stringify(newPinnedPlugins));
    setPinnedPlugins(newPinnedPlugins);
    console.log(
      "pinnedPlugins",
      pinnedPlugins,
      "newPinnedPlugins",
      newPinnedPlugins,
      "selectedPlugin",
      selectedPlugin,
      "pinActionType",
      pinActionType
    );
  };

  const pinnedPluginsForTabs = [];
  pinnedPlugins.forEach(pinnedPlugin => {
    const plugin = pluginsDir.find(plugin => plugin.tagName === pinnedPlugin);
    pinnedPluginsForTabs.push({
      key: plugin.tagName,
      title: plugin.name,
      component: (
        <Plugins
          onTransform={onTransform}
          selectedPlugin={plugin}
          pinnedPlugins={pinnedPlugins}
          handlePinChange={handlePinChange}
        />
      ),
      uiType: "grey",
    });
  });

  const tabs = [
    {
      key: "plugins",
      title: "Plugins",
      component: (
        <Plugins
          onTransform={onTransform}
          setPinnedPlugins={setPinnedPlugins}
          pinnedPlugins={pinnedPlugins}
          handlePinChange={handlePinChange}
        />
      ),
      uiType: "primary",
    },
    ...pinnedPluginsForTabs,
  ];
  console.log("rerender Tabs", tabs);

  return (
    <CollapsibleTabs tabs={tabs}>
      {selectedComponent => (
        <Suspense fallback={<div>Loading ...</div>}>
          {selectedComponent}
        </Suspense>
      )}
    </CollapsibleTabs>
  );
}

Tabs.propTypes = {
  onTransform: PropTypes.func.isRequired,
};

export default Tabs;
